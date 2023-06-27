import isString from 'lodash/isString';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

export function getImageScaleParams(image, size) {
  const imageScale = size || 'preview';

  if (isString(image))
    return isInternalURL(image)
      ? flattenToAppURL(`${image}/@@images/image/${imageScale}`)
      : image;

  if (image) {
    if (isInternalURL(image['@id'])) {
      if (image?.image_scales?.[image?.image_field]) {
        const scale =
          image.image_scales[image.image_field]?.[0].scales?.[imageScale] ||
          image.image_scales[image.image_field]?.[0];

        const download = flattenToAppURL(`${image['@id']}/${scale?.download}`);
        const width = scale?.width;
        const height = scale?.height;

        return {
          download,
          width,
          height,
        };
      } else if (image?.image?.scales) {
        const scale = image.image?.scales?.[imageScale] || image.image;
        const download = flattenToAppURL(scale?.download);
        const width = scale?.width;
        const height = scale?.height;

        return {
          download,
          width,
          height,
        };
      } else {
        //fallback if we do not have scales
        return {
          download: flattenToAppURL(
            `${image['@id']}/@@images/${
              image.image_field || 'preview_image'
            }/${imageScale}`,
          ),
        };
      }
    } else {
      return { download: image['@id'] };
    }
  }
}

export const setImageSize = (image, imageParams, size) => {
  const imageScaled = isInternalURL(image)
    ? (() => {
        if (imageParams) {
          const { scales = null } = imageParams;
          if (scales) {
            if (size === 'big') return scales.huge;
            if (size === 'medium') return scales.large;
            if (size === 'small') return scales.mini;
            if (size === 'preview') return scales.preview;
            if (size === 'tiny') return scales.thumb;
            return scales.large;
          } else
            return {
              download: imageParams?.download,
              width: imageParams?.width,
              height: imageParams?.height,
            };
        }
      })()
    : { download: image, width: '100%', height: '100%' };

  return imageScaled;
};
