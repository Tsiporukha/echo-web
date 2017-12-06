import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ShareIconMenu from './ShareIconMenu';

import styles from '../../assets/styles/card.css';


const RoomCard = ({room, playlist, songs}) => (
  <div className={styles.root}>
    <img className={styles.artwork} src={room.artwork_url} alt='room artwork' />
    <div className={styles.data}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>
          <Link to={`/genres/${room.genre}/rooms/${room.id}`}> {playlist.title} </Link>
        </div>
        <ShareIconMenu path={`/genres/${room.genre}/rooms/${room.id}`} picture={room.artwork_url}
          title={playlist.title} description={playlist.description} />
      </div>
      <div className={styles.description}> {playlist.description} </div>
    </div>
  </div>
);

export default RoomCard;
