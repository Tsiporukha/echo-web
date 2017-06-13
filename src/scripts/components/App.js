import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Navbar from './Navbar';

import styles from '../../assets/styles/app.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <div>
        <Link to='/feed'> <div> echo </div> </Link>
        <Route path='/feed' component={() => (<div style={{height: '10000px'}}>123</div>)} />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
