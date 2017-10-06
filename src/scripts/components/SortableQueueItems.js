import React, {Component} from 'react';
import {connect} from 'react-redux';

import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import QueueSong from '../containers/QueueSong';
import QueueStream from '../containers/QueueStream';

import styles from '../../assets/styles/queue.css';


const itemTypes = {song: QueueSong, stream: QueueStream};


const DragHandle = SortableHandle(() => <i className={styles.dragHandler}>drag_handle</i>);

const SortableItem = SortableElement(({id, ItemComponent}) => (
  <div className={styles.sortableItem}>
    <DragHandle />
    <div className={styles.item}> <ItemComponent id={id} /> </div>
  </div>
));

// const SortableQueueSong = SortableElement(({id}) => (
//   <div className={styles.sortableItem}>
//     <DragHandle />
//     <div className={styles.item}> <QueueSong id={id} /> </div>
//   </div>
// ));

const QueueItems = props => (
  <div>
    {props.items.map((item, index) => <SortableItem ItemComponent={itemTypes[item.type]} key={item.id} id={item.id} index={index} />)}
  </div>
);

export default SortableContainer(QueueItems);
