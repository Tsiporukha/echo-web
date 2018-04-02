import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import FacebookSDK from './FacebookSDK';
import Navbar from './Navbar';
import FeedSources from './FeedSources';
// import Genre from '../containers/Genre';
// import Room from '../containers/Room';
import Stream from '../containers/Stream';
import Profile from '../containers/Profile';
// import ProfileEditing from '../containers/ProfileEditing';
import Player from '../containers/Player';

import styles from '../../assets/styles/app.css';


const App = () => (
  <BrowserRouter>
    <div>
      <FacebookSDK />

      <Navbar />
      <div className={styles.content}>
        <Route exact path='/' component={FeedSources} />
        <Route exact path='/feed/:id' component={Stream} />
        <Route exact path='/profile/:id' component={Profile} />
        {/* <Route exact path='/settings' component={ProfileEditing} />
        <Route exact path='/genres/:title' component={Genre} />
        <Route exact path='/genres/:genre/rooms/:id' component={Room} /> */}
      </div>
      <Player />
    </div>
  </BrowserRouter>
);

export default App;
