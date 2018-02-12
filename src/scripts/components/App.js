import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import FacebookSDK from './FacebookSDK';
import Navbar from './Navbar';
import FeedSources from './FeedSources';
import Genre from '../containers/Genre';
import Room from '../containers/Room';
import Stream from '../containers/Stream';
import Profile from '../containers/Profile';
import Player from '../containers/Player';
import GuestLanding from '../containers/GuestLanding';

import {removeSeparator} from '../lib/route';

import styles from '../../assets/styles/app.css';


const App = () => (
  <BrowserRouter>
    <FacebookSDK />

    <Navbar />
    <div>
      <Route exact path='/' component={GuestLanding} />
      <Route exact path='/feed' component={FeedSources} />
      <Route exact path='/feed/:id' component={Stream} />
      <Route exact path='/profile/:id' component={Profile} />
      <Route exact path='/genres/:title' component={Genre} />
      <Route exact path='/genres/:genre/rooms/:id' component={Room} />
    </div>
    <Player />
  </BrowserRouter>
);

export default App;
