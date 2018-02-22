import React, {Component} from 'react';

import styles from '../../assets/styles/feed.css';

const WelcomeNote = () => (
  <div className={styles.welcomeNote}>
    <h2>Welcome to Echo (FAQ):</h2>

    <div>
      <h4>1. What is Echo? </h4>
      It’s a daily-updated source for music
      crowdsourced by our music loving
      community of users.
    </div>

    <div>
      <h4>2. What are Music Rooms?</h4>
      Each room is a themed playlist managed and  updated by users on a daily basis. The theme can be anything: a genre, a mood, a decade
      (Synthwave, Dark, 80s, HipHop, TripHop, Ethnic).
      Rooms can be public, shared or private.
    </div>

    <div>
      <h4>3. # What are Tags?</h4>
      When creating a Room users assign tags to playlists for in order to find them easily.
      Simply click on a tag in the feed and it will show all Rooms containing the tag
      (for ex:Electronic).
    </div>

    <div>
      <h4>4. How do I add tracks to Rooms?</h4>
      Show me>>On Echo you can search through YouTube, SoundCloud, Spotify and Deezer to find tracks, play and add them to Rooms.
    </div>

    <div>
      <h4>5. How do I listen to the freaking Music?!?</h4>
      If you click on “Play” or “Add to Queue”
      anywhere it will appear in the Queue.
      You can add a bunch of songs to the Queue, enjoy them and share (if you want) with the rest of Echo by saving them in a Public Room.

    </div>

  </div>
);

export default WelcomeNote;
