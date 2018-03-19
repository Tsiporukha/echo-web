import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import FeedSearch from '../containers/FeedSearch';
import PopularSongs from '../containers/PopularSongs';
import Youtube from '../containers/Youtube';
import Soundcloud from '../containers/Soundcloud';
import Vimeo from '../containers/Vimeo';
import SearchHistory from '../containers/SearchHistory';

import styles from '../../assets/styles/feed.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


export default class SearchSources extends Component {
  handleTabChange = index => this.setState({index});


  state = {
    index: 0,
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={`${styles.left} ${tabsTheme.feed}`}>

          <div className={styles.searchResultsPlaceholder}>
            <i className={styles.searchIcon}>search</i>
            <span>Your search results appear here.</span>
          </div>

          <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
            <Tab label={<i className={styles.feedIcon}>language</i>}> <FeedSearch /> </Tab>
            <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}> <PopularSongs /> </Tab>
            <Tab label={<i className={styles.youtubeIcon} />}> <Youtube /> </Tab>
            <Tab label={<i className={styles.soundcloudIcon} />}> <Soundcloud /> </Tab>
            <Tab label={<i className={styles.vimeoIcon} />}> <Vimeo /> </Tab>
          </Tabs>
        </div>

        <div className={styles.right}>
          <SearchHistory />
        </div>
      </div>
    );
  }
}
