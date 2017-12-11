import React, {Component} from 'react';
import {connect} from 'react-redux';

import StreamDescription from '../components/StreamDescription';
import SeparatedStream from '../components/SeparatedStream';
import {getSearchInput} from './Search';
import {addClonedPlaylistHolderToTopAndPlay, addClonedPlaylistHolder} from '../actions/QueueActions';
import {pause, play} from '../actions/PlayerActions';
import {fetchStream, fetchComments, receiveStreams} from '../actions/EntitiesAUDActions';
import {updateSearchTerm} from '../actions/SearchActions';

import {maybeGetStreamAndNestedEntities} from '../lib/stream';
import {update} from '../lib/ebApi/streams';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetStreamAndNestedEntities(state, ownProps.id || ownProps.match.params.id),
  token: state.session.token,
  currentUserId: !!state.session.user && state.session.user.id,
});

const mapDispatchToProps = dispatch => ({
  addToQueueTopAndPlay: (stream, playlist, songs) => () => dispatch(addClonedPlaylistHolderToTopAndPlay('stream')(stream, playlist, songs)),
  addToQueue: (stream, playlist, songs) => () => dispatch(addClonedPlaylistHolder('stream')(stream, playlist, songs)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  dispatchLikeAction: likeAction => (stream, token) => () => dispatch(likeAction(stream, token)),
  searchTag: tag => () => Promise.resolve(dispatch(updateSearchTerm(tag))).then(_ => getSearchInput().focus()),

  fetchStream: (streamId, token) => dispatch(fetchStream(streamId, token)),
  fetchComments: (streamId, limit, offset) => () => dispatch(fetchComments(streamId, limit, offset)),

  update: streamId => (playlist_title, playlist_description, tags, default_artwork_url, songs, token) =>
    update(streamId, playlist_title, playlist_description, tags, default_artwork_url, songs, token).then(stream => dispatch(receiveStreams([stream]))),
});


const Stream = props => props.match ? <SeparatedStream {...props} /> : <StreamDescription {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(Stream);


export const getStreamProps = component => connect(mapStateToProps, mapDispatchToProps)(component);
