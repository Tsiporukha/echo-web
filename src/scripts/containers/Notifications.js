import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import {getAssetUrl} from '../lib/assets';
import {getNotifications, readNotifications} from '../lib/ebApi/users';
import moment from 'moment';

import styles from '../../assets/styles/notifications.css';


const getUserName = user => user.username || user.name || '';

const updateNotificationDescription = (description, username, streamId) =>
  description.replace(`your ${username} friend`, username).slice(username.length).replace(streamId || '', '');

const getNotificationUrl = (key, userId, streamId) =>
  ['allow_followers', 'allow_on_air'].includes(key) ? `/profile/${userId}` : `/feed/${streamId}`;


const NotificationIcon = ({toggleNotificationsVisibility, notificationsVisibility, unreadNotificationsLength}) => (
  <span>
    <i className={styles[notificationsVisibility ? 'activeRootIcon' : 'rootIcon']}>notifications_none</i>
    <span hidden={!unreadNotificationsLength} className={styles.count}>{unreadNotificationsLength}</span>
  </span>
)


const Notification = ({notification}) => (
  <Link to={getNotificationUrl(notification.key, notification.user.id, notification.stream_id)}>
    <div className={styles.notification}>
      <Link to={`/profile/${notification.user.id}`}>
        <img className={styles.avatar} src={notification.user.avatar_url} alt='avatar' />
      </Link>
      <div className={styles.info}>
        <div>
          <Link to={`/profile/${notification.user.id}`}>
            <span className={styles.username}>{notification.user.name}</span>
          </Link>
          <Link to={getNotificationUrl(notification.key, notification.user.id, notification.stream_id)}>
            <span className={styles.message}>
              {updateNotificationDescription(notification.description, getUserName(notification.user), notification.stream_id)}
            </span>
          </Link>
        </div>
        {!!notification.comment_text && false && <span>{notification.comment_text}</span>}
        <div className={styles.time}>{moment(notification.created_at).fromNow()}</div>
      </div>
      {!notification.readed_at && <i className={styles.unreaded} />}
    </div>
  </Link>
);

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
)


const mapStateToProps = (state, ownProps) => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
});


class Notifications extends Component {

  showNotifications = () => this.setState({notificationsVisibility: true});
  hideNotifications = () => this.setState({notificationsVisibility: false});

  getNotifications = (token = this.props.token) => token && getNotifications(token).then(data => this.setState({notifications: data.pushes}));
  getUnread = (notifications = this.state.notifications) => notifications.filter(notf => !notf.readed_at);
  readNotifications = () => readNotifications(this.getUnread().map(notf => notf.id), this.props.token)
    .then(resp => resp.status === 200 ? this.setState({notifications: this.state.notifications.map(n => ({...n, readed_at: Date.now()}))}) : false );


  state = {
    notificationsVisibility: false,

    notifications: [],
  }

  componentDidMount = () => this.getNotifications(this.props.token);

  componentWillReceiveProps = nextProps => this.getNotifications(nextProps.token);

  render() {
    return(
      !!this.props.token &&
      <div className={styles.root}>
        <IconMenu menuRipple theme={styles} position='topRight'
          onShow={this.showNotifications} onHide={this.hideNotifications}
          icon={<NotificationIcon
            toggleNotificationsVisibility={this.toggleNotificationsVisibility}
            notificationsVisibility={this.state.notificationsVisibility}
            unreadNotificationsLength={this.getUnread().length} />
          }>

          <div className={styles.notificationsHeader}>
            <span>NOTIFICATIONS</span>
            <a onClick={this.readNotifications}>Mark as read</a>
          </div>
          {this.state.notifications.map(notf => <MenuItem key={notf.id} theme={styles}><Notification notification={notf} /> </MenuItem>)}
          <MenuItem theme={styles}> <EchoMessage /> </MenuItem>
        </IconMenu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
