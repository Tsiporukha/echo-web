import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import fromNow from 'moment-from-now';

import styles from '../../assets/styles/notifications.css';

const getUserName = user => user.username || user.name || '';

const updateNotificationDescription = (description, username, streamId) =>
  description.replace(`your ${username} friend`, username).slice(username.length).replace(streamId || '', '');

const getNotificationUrl = ({key, user, stream_id}) =>
  ['allow_followers', 'allow_on_air'].includes(key) ? `/profile/${user.id}` : `/feed/${stream_id}`;


const Notification = ({notification}) => (
  <Link to={getNotificationUrl(notification)} className={styles.notification}>
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
      <div className={styles.time}>{fromNow(new Date(notification.created_at))}</div>
    </div>
    {!notification.readed_at && <i className={styles.unreaded} />}
  </Link>
);

Notification.propTypes = {
  notification: PropTypes.object,
};


export default Notification;
