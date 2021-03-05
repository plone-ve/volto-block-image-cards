import config from '@plone/volto/registry';

const ImageCard = () => ({
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
      available_colors: config.settings.available_colors,
    },
    background_color: {
      widget: 'style_simple_color',
      title: 'Card Background color',
      type: 'color',
      available_colors: config.settings.available_colors,
      field_props: {
        available_colors: config.settings.available_colors,
      },
    },
  },

  required: ['attachedimage'],
});

const ImageCards = () => {
  const display_types_obj = config.blocks.blocksConfig.imagecards.display_types;
  const display_choices = [];
  const display_types_ids = Object.keys(display_types_obj);
  display_types_ids.forEach(function (value) {
    display_choices.push([value, display_types_obj[value].title]);
  });

  return {
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
        choices: display_choices,
      },
      cards: {
        widget: 'object_list',
        title: 'Images',
        // this is an invention, should confront with dexterity serializer
        description: 'Add a list of Images as Carousel Items',
        schema: ImageCard(),
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        type: 'string',
      },
    },

    required: ['display', 'cards'],
  };
};

export default ImageCards;
