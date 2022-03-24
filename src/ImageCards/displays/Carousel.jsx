import React from 'react';
import loadable from '@loadable/component';
import { Message } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';

import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import cx from 'classnames';

import 'slick-carousel/slick/slick.css';
import '../css/carousel.less';

import { getScaleUrl, getPath } from '../utils';

import { serializeNodes } from 'volto-slate/editor/render';
import { BodyClass } from '@plone/volto/helpers';

const Slider = loadable(() => import('react-slick'));

const Arrows = (props) => {
  const { slider = {} } = props;

  return (
    <div className="slider-arrow">
      <div className="ui container">
        <button
          className="left-arrow"
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickPrev();
            }
          }}
        >
          <Icon name={leftSVG} size="55px" />
        </button>

        <button
          className="right-arrow"
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickNext();
            }
          }}
        >
          <Icon name={rightSVG} size="55px" />
        </button>
      </div>
    </div>
  );
};

const Carousel = (props) => {
  const { data, editable } = props;
  const { cards } = data;
  const slider = React.useRef(null);

  var settings = {
    fade: true,
    speed: 800,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
  };

  return cards && cards.length > 0 ? (
    <div
      className={cx(
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-carousel" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
      >
        <div className="slider-wrapper">
          <Slider {...settings} ref={slider}>
            {(cards || []).map((card, index) => (
              <div className="slider-slide" key={index}>
                <div
                  className="slide-img"
                  style={
                    card.attachedimage
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            getPath(card.attachedimage),
                            props.image_scale || 'large',
                          )})`,
                        }
                      : {}
                  }
                />
                <div className="slide-overlay"></div>
                <div className="slider-caption ui container">
                  <div className="slide-body">
                    {card.link ? (
                      <UniversalLink href={card.link}>
                        <div className="slide-title">{card.title || ''}</div>
                      </UniversalLink>
                    ) : (
                      <div className="slide-title">{card.title || ''}</div>
                    )}
                    {/* Incomplete backward-compatibility: */}
                    {card.text?.data ? (
                      <div
                        className="slide-description"
                        dangerouslySetInnerHTML={{
                          __html: card.text?.data || '',
                        }}
                      />
                    ) : (
                      <div className="slide-description">
                        {serializeNodes(card.text)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="slide-copyright ui container">
                  {serializeNodes(card.copyright)}
                </div>
              </div>
            ))}
          </Slider>
          {cards.length > 1 && <Arrows slider={slider} />}
        </div>
      </div>
    </div>
  ) : (
    <>{editable ? <Message>No image cards</Message> : ''}</>
  );
};

export default Carousel;
