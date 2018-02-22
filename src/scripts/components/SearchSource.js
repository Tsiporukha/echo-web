import React, {Component} from 'react';

import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';
import Song from '../containers/Song';

import {onBottomReaching} from '../lib/scroll';

import {results as resultsClassName} from '../../assets/styles/search.css';


const limit = 15;


export default class SearchSource extends Component {
  setAttr = name => (val, callback) => this.setState({[name]: val}, callback);


  loadSongs = term =>
    doWithProgressLine(
      () => this.props.fetchAndReceiveSongs({term, limit, offset: this.state.offset}),
      this.setAttr('searching')
    );

  getSongs = searchTerm => () => this.state.searching ||
    this.loadSongs(searchTerm)
      .then(() => this.setAttr('offset')(this.state.offset + limit));

  getFirstSongsFor = searchTerm => this.setAttr('offset')(0, this.getSongs(searchTerm));


  handleScroll = () => onBottomReaching(
    this.getSongs(this.props.searchTerm),
    document.getElementsByClassName(resultsClassName)[0]
  );
  dispatchScrollListener = actionName => document.getElementsByClassName(resultsClassName)[0][actionName]('scroll', this.handleScroll);


  state = {
    offset: 0,

    searching: false,
  };

  componentDidMount = () => this.getSongs(this.props.searchTerm)()
    .then(this.dispatchScrollListener('addEventListener'));

  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');

  componentWillReceiveProps = nextProps => nextProps.searchTerm === this.props.searchTerm || this.getFirstSongsFor(nextProps.searchTerm);

  render() {
    return (
      <div>
        {this.props.songs.map(s => <Song id={s} key={s} />)}

        <IndeterminateProgressLine visible={this.state.searching} />
      </div>
    );
  }
}
