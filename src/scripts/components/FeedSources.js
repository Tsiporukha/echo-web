import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import Genres from './Genres';
import Feed from '../containers/Feed';
import FeedSearch from '../containers/FeedSearch';
import PopularSongs from '../containers/PopularSongs';
import Youtube from '../containers/Youtube';
import Soundcloud from '../containers/Soundcloud';
import Vimeo from '../containers/Vimeo';
import RecentlyLiked from '../containers/RecentlyLiked';
import SearchHistory from '../containers/SearchHistory';

import styles from '../../assets/styles/feed.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


const getFeedSourcesTabs = (search, activeTabIndex, handleTabChange) => (search ?
  <Tabs theme={tabsTheme} index={activeTabIndex} onChange={handleTabChange}>
    <Tab label={<i className={styles.feedIcon}>language</i>}> <FeedSearch /> </Tab>
    <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}> <PopularSongs /> </Tab>
    <Tab label={<i className={styles.youtubeIcon} />}> <Youtube /> </Tab>
    <Tab label={<i className={styles.soundcloudIcon} />}> <Soundcloud /> </Tab>
    <Tab label={<i className={styles.vimeoIcon} />}> <Vimeo /> </Tab>
  </Tabs>
  :
  <Tabs theme={tabsTheme} index={activeTabIndex} onChange={handleTabChange}>
    <Tab label={<i className={styles.genresIcon}>forum</i>}> <Genres /> </Tab>
    <Tab label={<i className={styles.feedIcon}>language</i>}> <Feed /> </Tab>
    <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}> <PopularSongs /> </Tab>
  </Tabs>
);


const maybeSearchResultsPlaceholder = search => search ?
  <div className={styles.searchResultsPlaceholder}>
    <i className={styles.searchIcon}>search</i> <br />
    <span>Your search results appear here.</span>
  </div>
  : false;


export default class FeedSources extends Component {

  handleTabChange = index => this.setState({index});


  state = {index: 0}

  render(){
    return (
      <section>
        <div className={styles.root}>
          <div className={styles.leftReg}>
            {maybeSearchResultsPlaceholder(this.props.search)}

            <div className={`${styles.feedSourceContent} ${tabsTheme.feed}`}>
              {getFeedSourcesTabs(this.props.search, this.state.index, this.handleTabChange)}
            </div>
          </div>

          <div className={styles.rightReg}>
            {this.props.search ? <SearchHistory /> : <RecentlyLiked /> }
          </div>
        </div>
      </section>
    );
  }
}
