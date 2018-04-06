import React from 'react';

import {renderRoutes} from 'react-router-config';

import FacebookSDK from './FacebookSDK';
import OpenGraph from './OpenGraph';
import Navbar from './Navbar';
import Player from '../containers/Player';

import styles from '../../assets/styles/app.css';


const App = props => (
  <div>
    <FacebookSDK />
    <OpenGraph title='Echo' description='Social music streaming service' />

    <Navbar />
    <div className={styles.content}>
      {renderRoutes(props.route.routes)}
    </div>
    <Player />
  </div>
);

export default App;
