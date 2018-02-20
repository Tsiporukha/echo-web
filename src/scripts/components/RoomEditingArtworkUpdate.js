import React, {Component} from 'react';

import styles from '../../assets/styles/roomEditing.css';


export default class RoomEditingArtworkUpdate extends Component {
  onIconClick = () => this.refs.input.click();

  uploadAndSet = () => this.props.uploadArtwork(this.refs.input.files[0]).then(({artwork_url}) => this.props.setUploadedArtworkUrl(artwork_url));

  render() {
    return (
      <span className={styles.editIconArea}>
        <input type='file' accept='image/*' ref='input' style={{display: 'none'}} onChange={this.uploadAndSet} />
        <i onClick={this.onIconClick} className={styles.editIcon}>mode_edit</i>
      </span>
    );
  }
}
