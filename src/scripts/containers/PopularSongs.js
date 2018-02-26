import React, {Component} from 'react';
import {connect} from 'react-redux';

import Song from './Song';

import {addSongs} from '../actions/EntitiesAUDActions';

import {reduceToObject} from '../lib/base';
import {getPopular} from '../lib/ebApi/songs';


const mapStateToProps = state => ({
  token: state.session.token,
  term: state.search.term,
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveSongs: (term, limit, offset, token) => getPopular(term, limit, offset, token)
    .then(({songs}) => Promise.resolve(dispatch(addSongs(reduceToObject(songs)))).then(_ => songs.map(song => song.id))),
});

class PopularSongs extends Component {
  fetchAndReceiveSongsIds = (term = this.props.term, token = this.props.token) =>
    this.props.fetchAndReceiveSongs(term, this.state.limit, this.state.offset, token).then(songs => this.setState({songs}));

  maybeReloadOnPropsChange = (nextProps, props = this.props) =>
    ((nextProps.term !== props.term) || (nextProps.token !== props.token)) ?
      this.fetchAndReceiveSongsIds(nextProps.term, nextProps.token) : false;


  componentDidMount = () => this.fetchAndReceiveSongsIds();

  componentWillReceiveProps = nextProps => this.maybeReloadOnPropsChange(nextProps, this.props)

  state = {
    songs: [],

    limit: 14,
    offset: 0,
  };

  render() {
    return (
      <div>
        {this.state.songs.map(songId => <Song id={songId} key={songId} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularSongs);
