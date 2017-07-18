import React, {Component} from 'react';
import {Button} from 'react-toolbox/lib/button';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import IndeterminateProgressLine, {doWithProgressLine} from './IndeterminateProgressLine';
import Stream from '../containers/Stream';

import {onBottomReaching} from '../lib/scroll';

import styles from '../../assets/styles/feed.css';
import {results as resultsClassName} from '../../assets/styles/search.css';


export default class Feed extends Component {

  handleTabChange = activeSubFeed => this.setState({filters: this.props.initialFilters, activeSubFeed});

  incrementOffsetFilter = (n = this.state.filters.limit) => this.setState({filters:{...this.state.filters, offset: this.state.filters.offset + n}});
  setSearchingVisibility = searching => this.setState({searching});
  loadMoreStreams = action => () => doWithProgressLine(() => this.props.fetchAndReceiveStreams(action)(this.state.filters), this.setSearchingVisibility)
    .then(this.incrementOffsetFilter);

  loadMoreLatestStreams = this.loadMoreStreams(this.props.fetchAndReceiveLatestStreamsAction);
  loadMorePopularStreams = this.loadMoreStreams(this.props.fetchAndReceivePopularStreamsAction);
  loadMoreLongestStreams = this.loadMoreStreams(this.props.fetchAndReceiveLongestStreamsAction);

  loadSubFeedStreams = subFeedIndex => [this.loadMorePopularStreams, this.loadMoreLatestStreams, this.loadMoreLongestStreams][subFeedIndex]();

  onSearchTermChange = filters => Promise.resolve(this.setState({filters})).then(_ => this.loadSubFeedStreams(this.state.activeSubFeed));

  dispatchScrollListener = (() => {
    const element = document.getElementsByClassName(resultsClassName)[0] || window;
    const handleScroll = () => onBottomReaching(() => this.loadSubFeedStreams(this.state.activeSubFeed), element);

    return actionName => element[actionName]('scroll', handleScroll);
  })();

  state = {
    filters: this.props.initialFilters,
    fetchedAll: false,
    activeSubFeed: 0,
    searching: false
  }

  componentWillMount = () => this.loadSubFeedStreams(this.state.activeSubFeed);
  componentDidMount = () => this.dispatchScrollListener('addEventListener');
  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');

  componentWillReceiveProps = nextProps =>
    nextProps.initialFilters.term !== this.props.initialFilters.term ? this.onSearchTermChange(nextProps.initialFilters) : false;

  render(){
    return (
      <div>
        <Tabs theme={styles} index={this.state.activeSubFeed} onChange={this.handleTabChange}>
          <Tab label='Most Popular' onActive={this.loadMorePopularStreams}>
            <div className={styles.streams}>
              {this.props.popular.map(s => <Stream id={s} key={s} />)}
            </div>
          </Tab>
          <Tab label='Latest' onActive={this.loadMoreLatestStreams}>
            <div className={styles.streams}>
              {this.props.latest.map(s => <Stream id={s} key={s} />)}
            </div>
          </Tab>
          <Tab label='Longest' onActive={this.loadMoreLongestStreams}>
            <div className={styles.streams}>
              {this.props.longest.map(s => <Stream id={s} key={s} />)}
            </div>
          </Tab>
        </Tabs>

        <IndeterminateProgressLine visible={this.state.searching} />
      </div>
    );
  }
}
