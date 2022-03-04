import codeSVG from '@plone/volto/icons/code.svg';
import React from 'react';
import { ImageCardsView, ImageCardsEdit } from './ImageCards';
import {
  BlockStyleWrapperEdit,
  BlockStyleWrapperView,
} from '@eeacms/volto-block-style/BlockStyleWrapper';
import AttachedImageWidget from './ImageCards/widgets/AttachedImageWidget';
import Cards from './ImageCards/displays/Cards';
import Carousel from './ImageCards/displays/Carousel';
import DiscreetCarousel from './ImageCards/displays/DiscreetCarousel';
import RoundTiled from './ImageCards/displays/RoundTiled';

export default (config) => {
  config.blocks.blocksConfig.imagecards = {
    id: 'imagecards',
    title: 'Image Cards',
    icon: codeSVG,
    group: 'common',
    view: (props) => (
      <BlockStyleWrapperView {...props}>
        <ImageCardsView {...props} />
      </BlockStyleWrapperView>
    ),
    edit: (props) => (
      <BlockStyleWrapperEdit {...props}>
        <ImageCardsEdit {...props} />
      </BlockStyleWrapperEdit>
    ),
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockRenderers: {
      round_tiled: {
        title: 'Round Tile',
        schema: null,
        view: RoundTiled,
      },
      carousel: {
        title: 'Splashy Carousel',
        schema: null,
        view: Carousel,
      },
      discreetCarousel: {
        title: 'Discreet Carousel',
        schema: null,
        view: DiscreetCarousel,
        schemaExtender: DiscreetCarousel.schemaExtender,
      },
      cards_grid: {
        title: 'Cards grid',
        view: Cards,
        schema: Cards.schema,
        schemaExtender: Cards.schemaExtender,
      },
    },
    security: {
      addPermission: [],
      view: [],
    },
  };

  if (!config.widgets.widget.attachedimage) {
    config.widgets.widget.attachedimage = AttachedImageWidget;
  }
  return config;
};
