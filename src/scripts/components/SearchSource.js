import React, {Component} from 'react';
import {Button} from 'react-toolbox/lib/button';

import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';
import Song from '../containers/Song';

import {onBottomReaching} from '../lib/scroll';

import {results as resultsClassName} from '../../assets/styles/search.css';


const initialFilters = {limit: 10, offset: 0};

export default class SearchSource extends Component {

  setInitialFilters = () => this.setState({filters: initialFilters});
  incrementOffsetFilter = (n = this.state.filters.limit) => this.setState({filters: {...this.state.filters, offset: this.state.filters.offset + n}});

  setSearchingVisibility = searching => this.setState({searching});
  loadMoreSongs = searchTerm => () =>
    doWithProgressLine(() => this.props.fetchAndReceiveSongs({...this.state.filters, term: searchTerm}), this.setSearchingVisibility)
      .then(this.incrementOffsetFilter);
  loadFirstSongs = searchTerm => Promise.resolve(this.setInitialFilters()).then(this.loadMoreSongs(searchTerm));
  handleScroll = () => onBottomReaching(this.loadMoreSongs(this.props.searchTerm), document.getElementsByClassName(resultsClassName)[0]);
  dispatchScrollListener = actionName => document.getElementsByClassName(resultsClassName)[0][actionName]('scroll', this.handleScroll);


  state = {filters: initialFilters};

  componentWillMount = () => this.loadFirstSongs(this.props.searchTerm);

  componentDidMount = () => this.dispatchScrollListener('addEventListener');
  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');

  componentWillReceiveProps = nextProps => nextProps.searchTerm !== this.props.searchTerm ? this.loadFirstSongs(nextProps.searchTerm) : false;

  render(){
    return (
      <div>
        {this.props.songs.map(s => <Song id={s} key={s} />)}

        <IndeterminateProgressLine visible={this.state.searching} />
      </div>
    );
  }
}
