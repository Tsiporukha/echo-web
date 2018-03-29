import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {emailLogin, networkLogin} from '../actions/SessionActions';

import styles from '../../assets/styles/login.css';


const mapDispatchToProps = dispatch => ({
  emailLogin: (email, password) => dispatch(emailLogin(email, password)),
  networkLogin: (token, network) => dispatch(networkLogin(token, network)),
});


class Login extends Component {
  static propTypes = {
    emailLogin: PropTypes.func.isRequired,
    networkLogin: PropTypes.func.isRequired,
  };


  onFacebookLoginStatus = response =>
    response.status === 'connected' ?
      this.props.networkLogin(response.authResponse.accessToken, 'facebook') :
      window.FB.login(resp => resp.status === 'connected' ? this.onFacebookLoginStatus(resp) : false);

  facebookLogin = () => window.FB.getLoginStatus(this.onFacebookLoginStatus);

  emailLogin = () => this.props.emailLogin(this.refs.email.value, this.refs.password.value)
    .catch(() => this.setState({invalidCredentials: true}));
  onSubmit = e => Promise.resolve(e.preventDefault()).then(this.emailLogin);


  state = {invalidCredentials: false};

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.signIn}>Sign in with:</div>

        <button className={styles.btnFb} onClick={this.facebookLogin}>Facebook</button>
        <div className={styles.orDivider}>or</div>
        <form onSubmit={this.onSubmit}>
          <div className={styles.input}>
            <input ref='email' required type='email' placeholder='email' />
          </div>
          <div className={styles.input}>
            <input ref='password' required type='password' placeholder='password' />
          </div>

          <div className={styles.ebArea}>
            {this.state.invalidCredentials && <p className={styles.err}>Incorrect email or password.</p>}
            <button type='submit' className={styles.btn}>Login</button>
          </div>
        </form>

        <div className={styles.mobileArea}>
          <div>
            <b>Need an account?</b><br />
            Download the app to sign up:
          </div>

          <div className={styles.btns}>
            <a href='https://itunes.apple.com/us/app/echo-sync-your-devices-in/id772203328?mt=8'
              target='_blank' rel='noopener noreferrer'>
              <button className={styles.btn}>
                <span className={styles.firstLine}>Download on the</span><br />
                <span className={styles.secondLine}>App Store</span>
              </button>
            </a>
            <a href='https://play.google.com/store/apps/details?id=com.echo.app'
              target='_blank' rel='noopener noreferrer'>
              <button className={styles.btn}>
                <span className={styles.firstLine}>Get it on</span><br />
                <span className={styles.secondLine}>Google Play</span>
              </button>
            </a>

          </div>

        </div>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Login);
