import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import FacebookSDK from './FacebookSDK';
import Navbar from './Navbar';
import FeedSources from './FeedSources';
import Stream from '../containers/Stream';
import Profile from '../containers/Profile';
import Player from '../containers/Player';

import {removeSeparator} from '../lib/route';

import styles from '../../assets/styles/app.css';


class AppBody extends Component {

  componentWillMount = () => removeSeparator(this.props.location.hash, this.props.history, '#!');

  render(){
    return(
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
    )
  }
}


const App = () => (
  <BrowserRouter>
    <Route component={AppBody} />
  </BrowserRouter>
);

export default App;
