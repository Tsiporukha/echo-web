import React, {Component} from 'react';
import {Tab, Tabs} from 'react-toolbox';

import Feed from '../containers/Feed';

import styles from '../../assets/styles/feed.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';

export default class FeedSources extends Component {

  state = {index: 0}

  handleTabChange = index => this.setState({index});

  render(){
    return (
      <section>
        <div className={styles.root}>
          <div className={styles.leftReg}>
            <div className={styles.feedSourceContent}>
              <Tabs theme={tabsTheme} index={this.state.index} onChange={this.handleTabChange}>
                <Tab label={<i className={styles.feedIcon}>language</i>}>
                  <Feed />
                </Tab>
                <Tab label={<i className={styles.whatshotIcon}>whatshot</i>}><small>whatshot</small></Tab>
              </Tabs>
            </div>
          </div>
        </div>



      </section>
    );
  }
}
