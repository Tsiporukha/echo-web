import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {IconMenu, MenuItem} from 'react-toolbox/lib/menu';

import Notification from '../components/Notification';

import {getAssetUrl} from '../lib/assets';
import {getNotifications, readNotifications} from '../lib/ebApi/users';

import styles from '../../assets/styles/notifications.css';


const EchoMessage = () => (
  <div className={styles.echoMessage}>
    <span className={styles.echoLogo}>
      <img className={styles.avatar} src={getAssetUrl('/images/echo_blue_logo.png')} alt='echoLogo' />
    </span>
    <div className={styles.info}>
      <div>Message from echo</div>
      <div className={styles.message}>"Hi there, Welcome to Echo; like some rooms and users and always stay on top of your music"</div>
    </div>
  </div>
);


const NotificationIcon = ({active, unread}) => (
  <span>
    <i className={styles[active ? 'activeRootIcon' : 'rootIcon']}>notifications_none</i>
    <span hidden={!unread} className={styles.count}>{unread}</span>
  </span>
);

NotificationIcon.propTypes = {
  active: PropTypes.bool,
  unread: PropTypes.number,
};


const mapStateToProps = state => ({
  token: state.session.token,
});

class Notifications extends Component {
  static propTypes = {
    token: PropTypes.string,
  }

  setActive = active => () => this.setState({active});

  getUnread = () => this.state.notifications.filter(notif => !notif.readed_at);
  updateReadedAt = (notifications = this.state.notifications) =>
    this.setState({notifications: notifications.map(n => ({...n, readed_at: n.readed_at || Date.now()}))});

  getNotifications = (token = this.props.token) =>
    token && getNotifications(token).then(data => this.setState({notifications: data.pushes}));

  readNotifications = () => readNotifications(this.getUnread().map(notf => notf.id), this.props.token)
    .then(resp => resp.status === 200 && this.updateReadedAt());


  state = {
    active: false,

    notifications: [],
  }

  componentDidMount = () => this.getNotifications(this.props.token);

  componentWillReceiveProps = nextProps => this.getNotifications(nextProps.token);

  render() {
    return (
      !!this.props.token &&
      <IconMenu menuRipple theme={styles} position='topRight'
        onShow={this.setActive(true)} onHide={this.setActive(false)}
        icon={
          <NotificationIcon
            active={this.state.active}
            unread={this.getUnread().length} />
          }>

        <div className={styles.notificationsHeader}>
          <span>NOTIFICATIONS</span>
          <a onClick={this.readNotifications}>Mark as read</a>
        </div>
        {this.state.notifications.map(notf =>
          <MenuItem key={notf.id} theme={styles}><Notification notification={notf} /> </MenuItem>)}
        <MenuItem theme={styles}> <EchoMessage /> </MenuItem>
      </IconMenu>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
