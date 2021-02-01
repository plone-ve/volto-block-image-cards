import React from 'react';
import { Link } from 'react-router-dom';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';

export const getPath = (url) =>
  url.startsWith('http') ? new URL(url).pathname : url;

export const fixUrl = (url) =>
  (url || '').includes(settings.apiPath)
    ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image`
    : `${url.replace('/api', '')}/@@images/image`;

/**
 * Similar to Link tag in react-router-dom but capable of handling external
 * links.
 */
export const ExtLink = ({ to, children, ...rest }) => {
  let u;
  try {
    u = new URL(to);
  } catch (ex) {
    u = new URL(to, window.location.href);
  }

  if (
    u.protocol === 'http:' ||
    u.protocol === 'https:' ||
    u.protocol === 'mailto:' ||
    u.protocol === 'tel:' ||
    u.protocol === 'sms:' ||
    u.protocol === 'ftp:'
  ) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};
