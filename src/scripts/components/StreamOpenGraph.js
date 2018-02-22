import React from 'react';
import {Helmet} from 'react-helmet';

const StreamOpenGraph = ({stream, playlist}) => (
  <Helmet>
    <meta property='og:type' content='website' />
    <meta property='og:site_name' content='Echo' />
    <meta property='og:title' content={playlist.title} />
    <meta property='og:description' content={playlist.description} />
    <meta property='og:url' content={`${document.domain}/feed/${stream.id}`} />
    <meta property='og:image' content={stream.artwork_url} />
    <meta property='og:image:width' content='968' />
    <meta property='og:image:height' content='504' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content={stream.title} />
    <meta name='twitter:description' content={stream.description} />
    <meta name='twitter:image:src' content={stream.artwork_url} />
    <meta name='twitter:url' content={`${document.domain}/feed/${stream.id}`} />
    <meta name='twitter:domain' content='echoapplication.com' />
    <meta name='twitter:site' content='@' />
    <meta name='twitter:creator' content='@...' />
  </Helmet>
);

export default StreamOpenGraph;
