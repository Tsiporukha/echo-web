import React, {Component} from 'react';

import styles from '../../assets/styles/roomEditing.css';


export default class ImageUploaderPenIcon extends Component {
  static defaultProps = {
    theme: {},
  };


  onIconClick = () => this.refs.input.click();

  uploadAndSet = () => this.props.upload(this.refs.input.files[0]).then(({artwork_url}) => this.props.setUploadedImageUrl(artwork_url));

  render() {
    return (
      <span className={`${styles.editIconArea} ${this.props.theme.editIconArea}`}>
        <input type='file' accept='image/*' ref='input' style={{display: 'none'}} onChange={this.uploadAndSet} />
        <i onClick={this.onIconClick} className={`${styles.editIcon} ${this.props.theme.editIcon}`}>mode_edit</i>
      </span>
    );
  }
}
