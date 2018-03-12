import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import Genres from './Genres';
import FeedSearch from '../containers/FeedSearch';
import PopularSongs from '../containers/PopularSongs';
import Youtube from '../containers/Youtube';
import Soundcloud from '../containers/Soundcloud';
import Vimeo from '../containers/Vimeo';
import RecentlyLiked from '../containers/RecentlyLiked';
import SearchHistory from '../containers/SearchHistory';

import styles from '../../assets/styles/feed.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


const MaybeSearchResultsPlaceholder = ({search}) => !!search && (
  <div className={styles.searchResultsPlaceholder}>
    <i className={styles.searchIcon}>search</i>
    <span>Your search results appear here.</span>
  </div>
);


export default class FeedSources extends Component {
  handleTabChange = index => this.setState({index});


  state = {index: 0}

  render() {
    return (
      <section>
        <div className={styles.root}>
          <div className={`${styles.left} ${tabsTheme.feed}`}>
            <MaybeSearchResultsPlaceholder search={this.props.search} />

            <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
              {!this.props.search && <Tab label={<i className={styles.genresIcon}>forum</i>}> <Genres /> </Tab>}
              <Tab label={<i className={styles.feedIcon}>language</i>}> <FeedSearch /> </Tab>
              <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}> <PopularSongs /> </Tab>
              {this.props.search && [
                <Tab label={<i className={styles.youtubeIcon} />}> <Youtube /> </Tab>,
                <Tab label={<i className={styles.soundcloudIcon} />}> <Soundcloud /> </Tab>,
                <Tab label={<i className={styles.vimeoIcon} />}> <Vimeo /> </Tab>,
              ]}
            </Tabs>
          </div>

          <div className={styles.right}>
            {this.props.search ? <SearchHistory /> : <RecentlyLiked /> }
          </div>
        </div>
      </section>
    );
  }
}
