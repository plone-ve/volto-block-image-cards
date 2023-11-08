import { getImageScaleParams } from './utils';

jest.mock('@plone/volto/helpers', () => ({
  flattenToAppURL: jest.fn((url) => url),
}));

describe('getImageScaleParams', () => {
  it('returns expected image scale URL when an image properties are passed', () => {
    const image = {
      '@id': 'http://localhost:3000/image',
      image_field: 'image',
      image_scales: {
        image: [
          {
            download: '@@images/image.png',
            width: 400,
            height: 400,
            scales: {
              preview: {
                download: '@@images/image-400.png',
                width: 400,
                height: 400,
              },
            },
          },
        ],
      },
    };

    const expectedUrl = '@@images/image-400.png';
    expect(getImageScaleParams(image, 'preview')).toEqual(expectedUrl);
  });

  // it('returns expected image scale URL when API path is not present', () => {
  //   const url = '/path/to/image';
  //   const size = 'large';
  //   const expectedUrl = '/path/to/image/@@images/image/large';
  //   expect(getScaleUrl(url, size)).toEqual(expectedUrl);
  // });

  // it('calls flattenToAppURL when API path is present', () => {
  //   const url = '/api/path/to/image';
  //   const size = 'large';
  //   getScaleUrl(url, size);
  //   expect(flattenToAppURL).toHaveBeenCalledWith('/path/to/image');
  // });
});
