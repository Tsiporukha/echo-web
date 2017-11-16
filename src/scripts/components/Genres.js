import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-toolbox/lib/button';

import ShareIconMenu from './ShareIconMenu';

import {genres} from '../lib/genres';

import styles from '../../assets/styles/genres.css';
import cardStyles from '../../assets/styles/card.css';

export const GenreCard = ({genre}) => (
  <div className={cardStyles.root}>
    <img className={cardStyles.artwork} src={genre.artwork_url} alt='genre artwork' />
    <div className={cardStyles.data}>
      <div className={cardStyles.titleBlock}>
        <div className={cardStyles.title}>
          <Link to={`/genres/${genre.title}`}> {genre.title} </Link>
        </div>
        <ShareIconMenu path={`/genres/${genre.title}`} picture={genre.artwork_url}
          title={genre.title} description={genre.description} />
      </div>
      <div className={cardStyles.description}> {genre.description} </div>
    </div>
  </div>
)

const MiniWelcomeNote = () => (
  <div className={styles.miniWelcomeNote}>
    <div className={styles.welcome}>Welcome to Echo!</div>
    <div className={styles.noteBody}>
      <div className={styles.note}>
        We are a collection of music communities. Browse through the genres
        and find fresh, events, venues, culture etc. Sign up to create your
        own library and get updates from communities that interest you.
      </div>
      <Button raised> <span className={styles.signInTitle}>Sign in</span> </Button>
    </div>
  </div>
);

const Genres = props => (
  <div>
    <MiniWelcomeNote />
    {genres.map(genre => <GenreCard key={genre.title} genre={genre} />)}
  </div>
)

export default Genres;
