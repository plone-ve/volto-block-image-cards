import React from 'react';
import RoundTiled from './RoundTiled';
import CardsGrid from './CardsGrid';
import Carousel from './Carousel';

const byDisplayType = {
  carousel: Carousel,
  round_tiled: RoundTiled,
  cards_grid: CardsGrid,
};

const ImageCardView = (props) => {
  const Impl = byDisplayType[props.data.display || 'carousel'];
  return <Impl {...props} />;
};

export default ImageCardView;
