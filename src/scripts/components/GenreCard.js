import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ShareIconMenu from './ShareIconMenu';

import styles from '../../assets/styles/genreCard.css';


const GenreCard = ({genre}) => (
  <Link to={`/genres/${genre.title}`}>
    <div className={styles.root} style={{backgroundImage: `url(${genre.background_url})`}}>
      <div className={styles.description}>
        {genre.description}
      </div>
      <div className={styles.title}>
        {genre.title}
      </div>
    </div>
  </Link>
);

export default GenreCard;
