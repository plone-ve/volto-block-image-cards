import cx from 'classnames';
import React from 'react';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import {Grid, Icon} from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import { fixUrl, getPath } from './utils';

import './css/cardsgrid.less';
import { serializeNodes } from 'volto-slate/editor/render';

export const thumbUrl = (url) =>
    (url || '').includes(settings.apiPath)
        ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image/preview`
        : `${url.replace('/api', '')}/@@images/image/preview`;

export const Card = (props) => {
    const { title, text, link, attachedimage } = props;

    return (
        <div className="ui card">
            {link ? (
                <>
                        <LazyLoadComponent>
                            <div
                                className="card-image"
                                style={
                                    attachedimage
                                        ? {
                                            backgroundImage: `url(${fixUrl(
                                                getPath(attachedimage),
                                            )})`,
                                        }
                                        : {}
                                }
                            ></div>
                        </LazyLoadComponent>
                    <div className="content">
                        <div className="card-title">
                            {serializeNodes(text)}
                        </div>
                    </div>

                    <div className="extra content">
                        <div className="right floated author">
                            <UniversalLink className={'card-link'} href={link}>
                                 <Icon link name='arrow alternate circle right' size='large' />
                            </UniversalLink>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <LazyLoadComponent>
                        <div
                            className="card-image"
                            style={{
                                backgroundImage: `url(${thumbUrl(getPath(attachedimage))})`,
                            }}
                        ></div>
                    </LazyLoadComponent>
                    <div className="card-title">
                              {serializeNodes(text)}
                    </div>
                </>
            )}
        </div>
    );
};

const CardsGrid = ({ data }) => {
    const { title, cards } = data;
    return (
        <div
            className={cx(
                'block align imagecards-block',
                {
                    center: !Boolean(data.align),
                },
                data.align,
            )}
        >
            <BodyClass className="has-card-tiles" />
            <div
                className={cx({
                    'full-width': data.align === 'full',
                })}
            >
                <div className={'cardsgrid'}>
                    <h2 className={'cardsgrid-title'}>{title}</h2>
                    <div className="ui three stackable cards">
                        <Grid className={'cards-grid'}>
                            {(cards || []).map((card, i) => (
                                <Grid.Column key={i} mobile={12} tablet={6} computer={3}>
                                    <Card {...card} />
                                </Grid.Column>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsGrid;
