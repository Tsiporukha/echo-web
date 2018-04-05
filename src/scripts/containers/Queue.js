import React, {Component} from 'react';
import {connect} from 'react-redux';

import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';
import {arrayMove} from 'react-sortable-hoc';

import LoginDialog from '../components/LoginDialog';
import StreamCreation from './StreamCreation';
import RoomCreation from './RoomCreation';
import SortableItems from '../components/SortableItems';

import {remove, set} from '../actions/QueueActions';
import {clear as clearPlayer, getQueueSongs} from '../actions/PlayerActions';

import styles from '../../assets/styles/queue.css';
import saveMenuStyles from '../../assets/styles/queueSaveMenu.css';

const mapStateToProps = state => ({
  items: state.queue.items,
  length: getQueueSongs(state).length,
  authed: !!state.session.token,
});

const mapDispatchToProps = dispatch => ({
  clear: items => () => {
    dispatch(clearPlayer());
    return dispatch(remove(items));
  },

  set: references => dispatch(set(references)),
});

// const itemTypes = {song: QueueSong, stream: QueuePlaylistHolder};
// const createJSXItem = (ItemComponent, itemId) => <ItemComponent key={itemId} id={itemId} />
// const createItem = item => createJSXItem(itemTypes[item.type], item.id);

class Queue extends Component {
  toggleStreamPublication = () => this.setState({streamPublication: !this.state.streamPublication});
  toggleRoomPublication = () => this.setState({roomPublication: !this.state.roomPublication});

  onSortEnd = ({oldIndex, newIndex}) => this.props.set(arrayMove(this.props.items, oldIndex, newIndex));


  state = {
    streamPublication: false,
    roomPublication: false,
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.length}>
            Your Queue: {(this.props.length)} songs
          </div>

          <div className={styles.icons}>
            <IconMenu icon='save' menuRipple theme={saveMenuStyles}>
              <MenuItem icon='save' caption='Save To:' disabled theme={saveMenuStyles} />
              <MenuDivider theme={saveMenuStyles} />
              <MenuItem disabled icon='create_new_folder' caption='Existing Stream' theme={saveMenuStyles} />
              {/* <MenuItem icon='playlist_add' caption='New Room' theme={saveMenuStyles} onClick={this.toggleRoomPublication} /> */}
              <MenuItem icon='playlist_add' caption='New Stream' theme={saveMenuStyles}
                disabled={!this.props.items.length} onClick={this.toggleStreamPublication} />
            </IconMenu>
            {this.state.streamPublication && (
              this.props.authed ?
                <StreamCreation onCancel={this.toggleStreamPublication} />
                :
                <LoginDialog active={this.state.streamPublication} onEscKeyDown={this.toggleStreamPublication} />
            )}

            {this.state.roomPublication && (
              this.props.authed ?
                <RoomCreation onCancel={this.toggleRoomPublication} />
                :
                <LoginDialog active={this.state.streamPublication} onEscKeyDown={this.toggleStreamPublication} />
            )}


            <i className={`${styles.clearIcon} ${this.props.items.length ? '' : styles.disabled}`}
              onClick={this.props.clear(this.props.items.map(item => item.id))}>clear_all</i>
          </div>
        </div>

        <div className={styles.items}>
          <SortableItems items={this.props.items} onSortEnd={this.onSortEnd} useDragHandle />
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Queue);
