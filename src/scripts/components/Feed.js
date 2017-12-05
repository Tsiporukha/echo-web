import React, {Component} from 'react';
import {Button} from 'react-toolbox/lib/button';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import IndeterminateProgressLine, {doWithProgressLine} from './IndeterminateProgressLine';
import TagsSelect from './TagsSelect';
import Stream from '../containers/Stream';

import {onBottomReaching} from '../lib/scroll';

import styles from '../../assets/styles/feed.css';
import {results as resultsClassName} from '../../assets/styles/search.css';

import {primaryTags} from '../lib/genres';


export default class Feed extends Component {

  reinitializeFilters = () => this.setState({filters: this.props.initialFilters});
  handleTabChange = activeSubFeed => this.setState({filters: this.props.initialFilters, activeSubFeed});

  incrementOffsetFilter = (n = this.state.filters.limit) => this.setState({filters:{...this.state.filters, offset: this.state.filters.offset + n}});
  setFetching = fetching => this.setState({fetching});
  loadMoreStreams = action => (token = this.props.token) =>
    doWithProgressLine(() => this.props.fetchAndReceiveStreams(action)({...this.state.filters, tags: this.state.tags}, token), this.setFetching)
      .then(this.incrementOffsetFilter);

  loadMoreLatestStreams = this.loadMoreStreams(this.props.fetchAndReceiveLatestStreamsAction);
  loadMorePopularStreams = this.loadMoreStreams(this.props.fetchAndReceivePopularStreamsAction);
  loadMoreLongestStreams = this.loadMoreStreams(this.props.fetchAndReceiveLongestStreamsAction);

  loadSubFeedStreams = subFeedIndex => token => [this.loadMorePopularStreams, this.loadMoreLatestStreams, this.loadMoreLongestStreams][subFeedIndex](token);
  loadActiveSubFeedStreams = () => this.loadSubFeedStreams(this.state.activeSubFeed)(this.props.token);

  onSearchTermChange = (filters, token) => this.setState({filters}, _ => this.loadSubFeedStreams(this.state.activeSubFeed)(token));

  dispatchScrollListener = (() => {
    const element = document.getElementsByClassName(resultsClassName)[0] || window;
    const handleScroll = () => onBottomReaching(() => this.loadActiveSubFeedStreams(), element);

    return actionName => element[actionName]('scroll', handleScroll);
  })();

  maybeReloadOnPropsChange = (nextProps, props = this.props) =>
    ((nextProps.initialFilters.term !== props.initialFilters.term) || (nextProps.token !== props.token)) ?
      this.onSearchTermChange(nextProps.initialFilters, nextProps.token) : false;

  setTags = tags => this.setState({tags});
  handleTagClick = tag => Promise.resolve(this.reinitializeFilters()).then(this.loadActiveSubFeedStreams);


  state = {
    filters: this.props.initialFilters,
    fetchedAll: false,
    activeSubFeed: 0,
    fetching: false,
    tags: [],
  }

  componentDidMount = () => Promise.resolve(this.loadActiveSubFeedStreams())
    .then(this.dispatchScrollListener('addEventListener'));

  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');

  componentWillReceiveProps = nextProps => this.maybeReloadOnPropsChange(nextProps, this.props)

  render(){
    return (
      <div>
        {this.props.initialFilters.term === undefined && <div className={styles.tags}>
          <TagsSelect
            allTags={primaryTags}
            selectedTags={this.state.tags}
            setTags={this.setTags}
            handleTagClick={this.handleTagClick}
            flashPrimary
            theme={styles}
          />
        </div>}
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

        <IndeterminateProgressLine visible={this.state.fetching} />
      </div>
    );
  }
}
