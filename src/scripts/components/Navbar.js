import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import styles from '../../assets/styles/navbar.css';

const Navbar = () => (
  <navbar className={styles.root}>
    <div className={styles.fixed}>
      <div className={styles.leftReg}>
        <div className={styles.brand}>
          <Link to='/'>
            <img src={require('../../assets/images/echo_logo.png')} alt='echo logo' className={styles.logo} />
            <span className={styles.title}>ECHO</span>
          </Link>
        </div>
        <div className={styles.search}>
          <input type='text' placeholder='Search Genre, Mood' />
        </div>
      </div>
      <div className={styles.rightReg}>
        right
      </div>
    </div>
  </navbar>
);

export default Navbar;
