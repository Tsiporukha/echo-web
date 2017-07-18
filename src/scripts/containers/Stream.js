import React, {Component} from 'react';
import {connect} from 'react-redux';

import StreamDescription from '../components/StreamDescription';
import StreamTabs from '../components/StreamTabs';
import {addClonedStreamToTopAndPlay, addClonedStream} from '../actions/QueueActions';
import {pause, play} from '../actions/PlayerActions';

import {getStreamAndNestedEntities} from '../lib/stream';

import styles from '../../assets/styles/stream.css';

const mapStateToProps = (state, ownProps) => getStreamAndNestedEntities(state, ownProps.id || ownProps.match.params.id);

const mapDispatchToProps = dispatch => ({
  addToQueueTopAndPlay: (stream, playlist, songs) => () => dispatch(addClonedStreamToTopAndPlay(stream, playlist, songs)),
  addToQueue: (stream, playlist, songs) => () => dispatch(addClonedStream(stream, playlist, songs)),
  pause: () => dispatch(pause()),
  play: () => dispatch(play())
});


const FeedStream = props => (
  <div className={styles.root}>
    <StreamDescription {...props} />
  </div>
);

const SeparatedStream = props => (
  <div className={styles.separated}>
    <div className={styles.fullStreamContainer}>
      <div className={styles.fullStream}>
        <StreamDescription {...props} />
        <StreamTabs {...props} />
      </div>
    </div>
  </div>
)


const Stream = props => props.match ? <SeparatedStream {...props} /> : <FeedStream {...props} />

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
