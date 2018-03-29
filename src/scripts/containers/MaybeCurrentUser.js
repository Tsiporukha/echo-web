import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Button from 'react-toolbox/lib/button';

import LoginDialog from '../components/LoginDialog';

import {updateCurrentUserData, clearSession} from '../actions/SessionActions';

import styles from '../../assets/styles/maybeCurrentUser.css';


const mapStateToProps = store => ({
  token: store.session.token,
  user: store.session.user,
});

const mapDispatchToProps = dispatch => ({
  clearSession: () => dispatch(clearSession()),
  updateCurrentUserData: token => dispatch(updateCurrentUserData(token)),
});

class MaybeCurrentUser extends Component {
  static propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,

    clearSession: PropTypes.func.isRequired,
    updateCurrentUserData: PropTypes.func,
  }

  toggleDialogVisibility = () => this.setState({dialogVisibility: !this.state.dialogVisibility});


  state = {dialogVisibility: false};

  componentDidMount = () => this.props.token && this.props.updateCurrentUserData(this.props.token);

  render() {
    return (
      <span className={styles.root}>
        {this.props.token ?
          <Link to={`/profile/${this.props.user.id}`}>
            <img src={this.props.user.avatar_url} alt='avatar' className={styles.avatar} />
            <span className={styles.username}>{this.props.user.name || this.props.user.username || ''}</span>
          </Link>
          :
          <span>
            <Button icon='account_circle' raised
              theme={styles}
              onClick={this.toggleDialogVisibility}> <span className={styles.signInTitle}>Sign in</span> </Button>

            <LoginDialog active={this.state.dialogVisibility} onEscKeyDown={this.toggleDialogVisibility} />
          </span>
        }
      </span>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaybeCurrentUser);
