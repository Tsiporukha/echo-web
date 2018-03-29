import React from 'react';
import {connect} from 'react-redux';

import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

import {addClonedPlaylistHolder} from '../actions/QueueActions';

import styles from '../../assets/styles/streamCard.css';

const TooltipButton = Tooltip(Button);


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addToQueue: (holder, playlist, songs) => () => dispatch(addClonedPlaylistHolder(ownProps.type)(holder, playlist, songs)),
});


const AddToQueueButton = props => (
  <TooltipButton theme={styles} raised tooltip='Add to Queue' tooltipDelay={500} onClick={props.addToQueue(props.holder, props.playlist, props.songs)}>
    <span className={styles.iconDescription}>
      <i className={styles.playlistAddIcon}>playlist_add</i><span>Add to Queue</span>
    </span>
  </TooltipButton>
);


export default connect(mapStateToProps, mapDispatchToProps)(AddToQueueButton);
