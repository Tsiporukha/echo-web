import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Input} from 'react-toolbox';

import ImageUploaderPenIcon from '../components/ImageUploaderPenIcon';

import {updateCurrentUser} from '../actions/EntitiesAUDActions';

import {uploadArtwork} from '../lib/ebApi/streams';

import styles from '../../assets/styles/profileEditing.css';
import streamEditingStyles from '../../assets/styles/streamPublication.css';

const mapStateToProps = state => ({
  user: state.session.user,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  update: (user, token) => updateCurrentUser(user, token)(dispatch),
});


class ProfileEditing extends Component {
  setAttr = name => val => this.setState({[name]: val});


  uploadAvatar= file => uploadArtwork(file, this.props.token);

  isAllFielsFilled = () => this.state.name
  ;

  update = () => this.props.update({name: this.state.name}, this.props.token);

  maybeSave = () => this.isAllFielsFilled() ? this.update().then(this.props.history.goBack) : this.setState({triedSave: true});
  maybeError = (filled, errMssg) => (this.state.triedSave && !filled) ? errMssg : false;

  state = {
    name: this.props.user.name,
    avatar_url: this.props.user.avatar_url,

    triedSave: false,
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.avatar}>
          <img src={this.state.avatar_url} alt='your avatar' />
          <ImageUploaderPenIcon theme={styles} upload={this.uploadAvatar} setUploadedImageUrl={this.setAttr('avatar_url')} />
        </div>
        <div>
          <Input type='text' name='name' label='Name'
            className={styles.title} theme={{...streamEditingStyles, ...styles}} value={this.state.name}
            onChange={this.setAttr('name')} error={this.maybeError(this.state.description, "Name can't be blank")} />
        </div>
        <div className={styles.buttonsArea}>
          <Button primary raised onClick={this.maybeSave}>save</Button>
          <Button onClick={this.props.history.goBack}>Cancel</Button>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditing);
