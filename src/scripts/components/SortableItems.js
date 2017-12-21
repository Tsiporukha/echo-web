import React, {Component} from 'react';
import {connect} from 'react-redux';

import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import QueueSong from '../containers/QueueSong';
import QueuePlaylistHolder from '../containers/QueuePlaylistHolder';
import PlaylistHolderSong from '../containers/PlaylistHolderSong';

import styles from '../../assets/styles/queue.css';


const DragHandle = SortableHandle(() => <i className={styles.dragHandler}>drag_handle</i>);

const SortableItem = SortableElement(({ItemComponent, type, ...props}) => (
  <div className={styles.sortableItem}>
    <DragHandle />
    <div className={styles.item}> <ItemComponent id={props.id} type={props.type} {...props} /> </div>
  </div>
));


/// QueueItems
const queueItemTypes = {song: QueueSong, stream: QueuePlaylistHolder, room: QueuePlaylistHolder};

const SortableQueueItems = props => (
  <div>
    {props.items.map((item, index) =>
      <SortableItem ItemComponent={queueItemTypes[item.type]} type={item.type} key={item.id} id={item.id} index={index} />)}
  </div>
);
/// end QueueItems


/// PlaylistHolderItems
const SortablePlaylistHolderSongs = props => (
  <div>
    {props.items.map((item, index) =>
      <SortableItem ItemComponent={PlaylistHolderSong} type='song' key={item.id} id={item.id} index={index} playlist={props.playlist} />)}
  </div>
);
/// end PlaylistHolderItems


const SortableItems = props => (props.playlist ? SortablePlaylistHolderSongs : SortableQueueItems)(props);


export default SortableContainer(SortableItems);
