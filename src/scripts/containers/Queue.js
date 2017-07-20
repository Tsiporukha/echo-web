import React, {Component} from 'react';
import {connect} from 'react-redux';

import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';

import QueueSong from './QueueSong';
import QueueStream from './QueueStream';

import {remove} from '../actions/QueueActions';
import {clear as clearPlayer, getQueueSongs} from '../actions/PlayerActions';

import styles from '../../assets/styles/queue.css';

const mapStateToProps = state => ({
  items: state.queue.items,
  length: getQueueSongs(state).length
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clear: items => () => {
    dispatch(clearPlayer());
    return dispatch(remove(items))
  }
});

const itemTypes = {song: QueueSong, stream: QueueStream};
const createJSXItem = (ItemComponent, itemId) => <ItemComponent key={itemId} id={itemId} />
const createItem = item => createJSXItem(itemTypes[item.type], item.id);

const Queue = props => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.length}>
        Your Queue: {(props.length)} songs
      </div>

      <div className={styles.icons}>
        <IconMenu icon='save' menuRipple theme={styles}>
          <MenuItem icon='save' caption='Save To:' disabled theme={styles} />
          <MenuDivider theme={styles} />
          <MenuItem icon='create_new_folder' caption='Existing Room' theme={styles} />
          <MenuItem icon='playlist_add' caption='New Room' theme={styles} />
        </IconMenu>

        <i className={`${styles.clearIcon} ${props.items.length ? '' : styles.disabled}`}
          onClick={props.clear(props.items.map(item => item.id))}>clear_all</i>
      </div>
    </div>
    
    <div className={styles.items}>
      {props.items.map(createItem)}
    </div>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Queue);
