import React, {Component} from 'react';

import GenreCard from './GenreCard';

import {genres} from '../lib/genres';

import styles from '../../assets/styles/genres.css';


const MiniWelcomeNote = () => (
  <div className={styles.miniWelcomeNote}>
    <div className={styles.welcome}>Welcome to Echo!</div>
    <div className={styles.noteBody}>
      <div className={styles.note}>
        We are a collection of music communities. Browse through the genres
        and find fresh, events, venues, culture etc. Sign up to create your
        own library and get updates from communities that interest you.
      </div>
    </div>
  </div>
);

const Genres = props => (
  <div>
    <MiniWelcomeNote />
    {genres.map(genre => <GenreCard key={genre.title} genre={genre} />)}
  </div>
);

export default Genres;
