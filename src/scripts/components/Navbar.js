import React from 'react';
import {Link} from 'react-router-dom';

import Search from '../containers/Search';
import Notifications from '../containers/Notifications';
import MaybeCurrentUser from '../containers/MaybeCurrentUser';
import {getAssetUrl} from '../lib/assets';

import styles from '../../assets/styles/navbar.css';

const Navbar = () => (
  <nav className={styles.root}>
    <div className={styles.fixed}>
      <div className={styles.leftReg}>
        <div className={styles.brand}>
          <Link to='/'>
            <img src={getAssetUrl('/images/echo_logo.png')} alt='echo logo' className={styles.logo} />
            <span className={styles.title}>ECHO</span>
          </Link>
        </div>
        <div className={styles.search}>
          <Search />
        </div>
      </div>
      <div className={styles.rightReg}>
        <Notifications />
        <MaybeCurrentUser />
      </div>
    </div>
  </nav>
);

export default Navbar;
