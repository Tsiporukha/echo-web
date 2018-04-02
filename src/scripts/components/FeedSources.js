import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

// import Genres from './Genres';
import Feed from '../containers/Feed';
import PopularSongs from '../containers/PopularSongs';
import RecentlyLiked from '../containers/RecentlyLiked';

import styles from '../../assets/styles/feed.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


export default class FeedSources extends Component {
  handleTabChange = index => this.setState({index});


  state = {
    index: 0,
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={`${styles.left} ${tabsTheme.feed}`}>
          <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
            {/* <Tab label={<i className={styles.genresIcon}>forum</i>}> <Genres /> </Tab>, */}
            <Tab label={<i className={styles.feedIcon}>language</i>}> <Feed /> </Tab>
            <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}> <PopularSongs /> </Tab>
          </Tabs>
        </div>

        <div className={styles.right}>
          <RecentlyLiked />
        </div>
      </div>
    );
  }
}
