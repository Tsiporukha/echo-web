import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from 'react-toolbox/lib/input';

import LoginDialog from '../components/LoginDialog';

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
  toggleLoginVisibility = () => this.setState({loginVisibility: !this.state.loginVisibility});
  setComment = comment => this.setState({comment});

  publish = () => this.props.addComment(this.props.stream, this.state.comment, this.props.token).then(_ => this.setComment(''));
  maybePublish = () => this.props.token ? (this.state.comment.trim() ? this.publish() : false) : this.toggleLoginVisibility();

  onKeyUp = e => e.keyCode === 13 ? this.maybePublish() : false;


  state = {
    comment: '',
    loginVisibility: false,
  };

  render() {
    return (
      <div className={styles.root}>
        {this.props.user && <img className={styles.publicationAvatar} src={this.props.user.avatar_url} alt='avatar' />}
        <Input type='text' name='comment' hint='Leave a comment'
          className={styles.materialInput} theme={inputTheme} maxLength={65535} value={this.state.comment}
          onChange={this.setComment} onKeyUp={this.onKeyUp} />

        {!this.props.token && <LoginDialog active={this.state.loginVisibility} onEscKeyDown={this.toggleLoginVisibility} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentPublication);
