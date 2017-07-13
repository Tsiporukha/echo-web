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

class Stream extends Component {

  render() {
    const separated = !!this.props.match;
    return(
      <div className={`${styles.root} ${separated ? styles.full : ''}`}>
        <div className={separated ? styles.fullStream : ''}>
          <StreamDescription {...this.props} />
          {separated && <StreamTabs {...this.props} />}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
