import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import FacebookSDK from './FacebookSDK';
import Navbar from './Navbar';
import FeedSources from './FeedSources';
import Stream from '../containers/Stream';
import Profile from '../containers/Profile';
import Player from '../containers/Player';

import styles from '../../assets/styles/app.css';

const App = () => (
  <BrowserRouter>
    <div>
      <FacebookSDK />

      <Navbar />
      <div>
        <Route exact path='/' component={FeedSources} />
        <Route exact path='/feed/:id' component={Stream} />
        <Route exact path='/profile/:id' component={Profile} />
      </div>
      <Player />
    </div>
  </BrowserRouter>
);

export default App;
