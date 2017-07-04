import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-toolbox/lib/button';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import Stream from './Stream';

import {
  fetchAndReceiveLatestStreams, fetchAndReceivePopularStreams, fetchAndReceiveLongestStreams
} from '../actions/SubFeedsActions';

import styles from '../../assets/styles/feed.css';

const mapStateToProps = store => ({
  latest: store.feedSources.feed.latest,
  popular: store.feedSources.feed.popular,
  longest: store.feedSources.feed.longest
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveStreams: action => filters => dispatch(action(filters))
});

const initialFilters = {limit:5, offset: 0}

class Feed extends Component {

  handleTabChange = activeSubFeed => this.setState({filters: initialFilters, activeSubFeed})

  incrementOffsetFilter = (n = 5) => this.setState({filters:{...this.state.filters, offset: this.state.filters.offset + n}});
  loadMoreStreams = action => this.props.fetchAndReceiveStreams(action)(this.state.filters).then(_ => this.incrementOffsetFilter(5));
  loadMoreLatestStreams = () => this.loadMoreStreams(fetchAndReceiveLatestStreams);
  loadMorePopularStreams = () => this.loadMoreStreams(fetchAndReceivePopularStreams);
  loadMoreLongestStreams = () => this.loadMoreStreams(fetchAndReceiveLongestStreams);


  state = {
    filters: initialFilters,
    fetchedAll: false,
    activeSubFeed: 0
  }

  componentWillMount = () => this.loadMoreLatestStreams();

  render(){
    return (
      <Tabs theme={styles} index={this.state.activeSubFeed} onChange={this.handleTabChange}>
        <Tab label='Latest' onActive={this.loadMoreLatestStreams}>
          <div className={styles.streams}>
            {this.props.latest.map(s => <Stream id={s} key={s} />)}
            <Button label='load more' raised primary onClick={this.loadMoreLatestStreams} />
          </div>
        </Tab>
        <Tab label='Most Popular' onActive={this.loadMorePopularStreams}>
          <div className={styles.streams}>
            {this.props.popular .map(s => <Stream id={s} key={s} />)}
            <Button label='load more' raised primary onClick={this.loadMorePopularStreams} />
          </div>
        </Tab>
        <Tab label='Longest' onActive={this.loadMoreLongestStreams}>
          <div className={styles.streams}>
            {this.props.longest .map(s => <Stream id={s} key={s} />)}
            <Button label='load more' raised primary onClick={this.loadMoreLongestStreams} />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
