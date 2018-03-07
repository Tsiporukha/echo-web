import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Button} from 'react-toolbox';

import GenreCard from '../components/GuestLandingGenreCard';
import LoginDialog from '../components/LoginDialog';

import {redirectTo} from '../lib/route';
import {genres} from '../lib/genres';
import {getAssetUrl} from '../lib/assets';

import styles from '../../assets/styles/guestLanding.css';


const mapStateToProps = store => ({
  token: store.session.token,
});

class GuestLanding extends Component {
  static propTypes = {
    token: PropTypes.string,
    history: PropTypes.object,
  };

  redirectToFeedIfLogged = () => this.props.token && redirectTo(this.props.history, '/feed');

  toggle = prop => () => this.setState({[prop]: !this.state[prop]});

  showSearchSources = () => this.setState({searchInput: true});

  setSearchSource = searchSource => () => this.setState({searchSource});

  showAllGenres = () => this.setState({allGenres: true})


  state = {
    login: false,
    searchInput: false,
    searchSource: 0,
    allGenres: false,
  };

  componentWillMount = this.redirectToFeedIfLogged;

  componentWillReceiveProps = this.redirectToFeedIfLogged;


  render() {
    const isActive = source => this.state.searchSource === source ? styles.active : '';

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img src={getAssetUrl('/images/echo_violet_logo.png')} alt='echo' />

          <span className={styles.signIn} onClick={this.toggle('login')}>
            <i className={styles.signInIcon}>person_outline</i>
            <span>SIGN IN</span>
          </span>
          {this.state.login && <LoginDialog active={this.state.login} onEscKeyDown={this.toggle('login')} />}
        </div>

        <div className={styles.body}>
          <div className={styles.echo}>ECHO</div>

          <div className={styles.searchArea}>
            <div className={styles.beforeSearch}>
              {this.state.searchInput ?
                <div className={styles.searchSources}>
                  <i onClick={this.setSearchSource(0)} className={`${styles.feedIcon} ${isActive(0)}`}>language</i>
                  <i onClick={this.setSearchSource(1)} className={`${styles.youtubeIcon} ${isActive(1)}`} />
                  <i onClick={this.setSearchSource(2)} className={`${styles.soundcloudIcon} ${isActive(2)}`} />
                  <i onClick={this.setSearchSource(3)} className={`${styles.vimeoIcon} ${isActive(3)}`} />
                </div>
                :
                <span>
                  Try multi source search to create your first playlist
                </span>
              }
            </div>

            <div className={styles.search}>
              <i className={styles.searchIcon}>search</i>
              <input
                type='text'
                placeholder='Search artist, genre, song...'
                onFocus={this.showSearchSources}
              />
              <Button raised primary theme={styles}>FIND</Button>
            </div>

            <div className={styles.afterSearch}>
              {this.state.searchInput && <span>
                Select the search source for search <br /> or leave it without change <br /> to search in Echo
              </span>}
            </div>
          </div>

          <div className={styles.exploreTitle}>
            Explore ECHO
          </div>

          <div className={styles.genresTitle}>
            Click on genre <br /> and find fresh, events, venues, culture etc.
          </div>

          <div>
            {genres.slice(0, this.state.allGenres ? genres.length : 2).map(genre => <GenreCard key={genre.title} genre={genre} />)}

            {this.state.allGenres || <div onClick={this.showAllGenres} className={styles.viewAll}>
              View all
            </div>}
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GuestLanding);
