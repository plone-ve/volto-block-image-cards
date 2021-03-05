import codeSVG from '@plone/volto/icons/code.svg';
import { ImageCardsView, ImageCardsEdit } from './ImageCards';
import AttachedImageWidget from './ImageCards/AttachedImageWidget';

export default (config) => {
  config.blocks.blocksConfig.imagecards = {
    id: 'imagecards',
    title: 'Image Cards',
    icon: codeSVG,
    group: 'common',
    view: ImageCardsView,
    edit: ImageCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    display_types: {
      round_tiled: {
        title: 'Round Tile',
        schema: null,
      },
      cards_grid: {
        title: 'Cards grid',
        schema: null,
      },
      carousel: {
        title: 'Carousel',
        schema: null,
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
