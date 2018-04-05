import React, {Component} from 'react';

import styles from '../../assets/styles/notFound.css';


const NotFound = () => (
  <div className={styles.root}>
    <div className={styles.status}>404</div>
    <div className={styles.message}>NOT FOUND</div>
  </div>
);

export default NotFound;
