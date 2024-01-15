import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';
import ImageCardsEdit from './ImageCardsEdit';

config.blocks.blocksConfig = {
  imagecards: {
    blockRenderers: {
      id1: {
        schemaExtender: (schema, data) => ({
          ...schema,
          properties: {
            ...schema.properties,
            customProperty: { type: 'string', title: 'Custom Property' },
          },
        }),
      },
      id2: {
        view: () => <div>id2</div>,
      },
      id3: {
        view: () => <div>id3</div>,
      },
    },
  },
};

describe('ImageCardsEdit', () => {
  it('should render without crashing', () => {
    const component = renderer.create(
      <Provider store={global.store}>
        <ImageCardsEdit
          data={{ display: 'id1' }}
          onChangeBlock={jest.fn()}
          block="1234"
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should render without crashing and no display', () => {
    const component = renderer.create(
      <Provider store={global.store}>
        <ImageCardsEdit
          data={{ display: undefined }}
          onChangeBlock={jest.fn()}
          block="1234"
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
