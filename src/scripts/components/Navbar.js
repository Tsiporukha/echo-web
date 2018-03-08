import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import Search from '../containers/Search';
import Notifications from '../containers/Notifications';
import MaybeCurrentUser from '../containers/MaybeCurrentUser';
import {getAssetUrl} from '../lib/assets';

import styles from '../../assets/styles/navbar.css';


const Brand = () => (
  <Link className={styles.brand} to='/'>
    <img src={getAssetUrl('/images/echo_logo.png')} alt='echo logo' className={styles.logo} />
    <span className={styles.title}>ECHO</span>
  </Link>
);


class Navbar extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  toggleItems = () => this.setState({itemsVisibility: !this.state.itemsVisibility});

  hideItemsOnPathChange = nextProps => this.props.location.pathname === nextProps.location.pathname
    || this.setState({itemsVisibility: false});


  state = {
    itemsVisibility: false,
  }

  componentWillReceiveProps = this.hideItemsOnPathChange;

  render() {
    return (
      <nav className={styles.root}>
        <div className={styles.menuIconArea}>
          <Brand />
          <i onClick={this.toggleItems} className={styles.menuIcon}>menu</i>
        </div>
        <div className={`${styles.items} ${styles[this.state.itemsVisibility && 'visible']}`}>
          <Brand />
          <div className={styles.search}>
            <Search />
          </div>
          <div className={styles.notifications}>
            <Notifications />
          </div>
          <div className={styles.maybeUser}>
            <MaybeCurrentUser />
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
