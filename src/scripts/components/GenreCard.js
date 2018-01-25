import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ShareIconMenu from './ShareIconMenu';

import styles from '../../assets/styles/card.css';


const GenreCard = ({genre}) => (
  <div className={styles.root}>
    <img className={styles.artwork} src={genre.artwork_url} alt='genre artwork' />
    <div className={styles.data}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>
          <Link to={`/genres/${genre.title}`}> {genre.title} </Link>
        </div>
        <ShareIconMenu path={`/genres/${genre.title}`} picture={genre.artwork_url}
          title={genre.title} description={genre.description} />
      </div>
      <div className={styles.description}> {genre.description} </div>
    </div>
  </div>
);

export default GenreCard;
