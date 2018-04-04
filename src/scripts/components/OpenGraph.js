import React from 'react';
import {Helmet} from 'react-helmet';

import {getAssetUrl} from '../lib/assets';
import {getClientUrl} from '../lib/url';


const OpenGraph = ({
  title = 'See on Echo', description = '',
  image = getAssetUrl('/images/echo_logo_180.png'), url = getClientUrl(),
}) => (
  <Helmet>
    <meta property='og:type' content='website' />
    <meta property='og:site_name' content='Echo' />
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:url' content={url} />
    <meta property='og:image' content={image} />
    <meta property='og:image:width' content='968' />
    <meta property='og:image:height' content='504' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
    <meta name='twitter:image:src' content={image} />
    <meta name='twitter:url' content={url} />
    <meta name='twitter:domain' content='echoapplication.com' />
    <meta name='twitter:site' content='@' />
    <meta name='twitter:creator' content='@...' />
  </Helmet>
);

export default OpenGraph;
