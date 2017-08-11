import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Input} from 'react-toolbox';

import {addComment} from '../actions/EntitiesAUDActions';

import styles from '../../assets/styles/comment.css';
import inputTheme from '../../assets/styles/streamPublication.css';


const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  addComment: (stream, body, token) => dispatch(addComment(stream, body, token)),
});


class CommentPublication extends Component {

  setComment = comment => this.setState({comment});
  publishComment = () => this.state.comment.trim() ? this.props.addComment(this.props.stream, this.state.comment, this.props.token) : false;
  onKeyUp = e => e.keyCode === 13 ? this.publishComment().then(_ => this.setState({comment: ''})) : false;


  state = {
    comment: '',
  };

  render() {
    return(
      !!this.props.token && <div className={styles.root}>
        <img className={styles.publicationAvatar} src={this.props.user.avatar_url} alt='avatar' />
        <Input type='text' name='comment' hint='Leave a comment'
          className={styles.materialInput} theme={inputTheme} maxLength={65535} value={this.state.comment}
          onChange={this.setComment} onKeyUp={this.onKeyUp} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPublication);
