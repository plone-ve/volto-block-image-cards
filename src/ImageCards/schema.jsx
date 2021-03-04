import config from '@plone/volto/registry';

const ImageCard = {
  title: 'Image Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'title',
        'text',
        'attachedimage',
        'link',
        'copyright',
        'background_color',
        'text_color',
      ],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
    },
    link: {
      widget: 'object_by_list',
      title: 'Link',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
    },
    copyright: {
      widget: 'slate_richtext',
      title: 'Copyright',
    },
    text_color: {
      widget: 'style_simple_color',
      title: 'Card Text color',
      type: 'color',
      available_colors: config.settings?.available_colors,
    },
    background_color: {
      widget: 'style_simple_color',
      title: 'Card Background color',
      type: 'color',
      available_colors: config.settings?.available_colors,
    },
  },

  required: ['attachedimage'],
};

const ImageCards = {
  title: 'Image Cards',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'text', 'display', 'align', 'cards'],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    text: {
      widget: 'slate_richtext',
      title: 'Text',
    },
    display: {
      title: 'Display',
      choices: [
        ['round_tiled', 'Round Tiled'],
        ['cards_grid', 'Cards grid'],
        ['carousel', 'Carousel'],
      ],
    },
    cards: {
      widget: 'object_list',
      title: 'Images',
      // this is an invention, should confront with dexterity serializer
      description: 'Add a list of Images as Carousel Items',
      schema: ImageCard,
    },
    align: {
      title: 'Alignment',
      widget: 'align',
      type: 'string',
    },
  },

  required: ['display', 'cards'],
};

export default ImageCards;
