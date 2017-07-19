import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Search from '../containers/Search';
import MaybeCurrentUser from '../containers/MaybeCurrentUser';

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
          <Search />
        </div>
      </div>
      <div className={styles.rightReg}>
        <MaybeCurrentUser />
      </div>
    </div>
  </navbar>
);

export default Navbar;
