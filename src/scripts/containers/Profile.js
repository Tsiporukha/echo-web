import React, {Component} from 'react';
import {connect} from 'react-redux';

import Stream from './Stream';

import {addUsers, addNormalizedStreamsData} from '../actions/EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {getUser} from '../lib/ebApi/users';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';

import styles from '../../assets/styles/user.css';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id]
});

const mapDispatchToProps = dispatch => ({
  addUsers: user => dispatch(addUsers(user)),
  addNormalizedStreamsData: normalizedData => dispatch(addNormalizedStreamsData(normalizedData))
});

class Profile extends Component {

  state = {
    offset: 0,
    limit: 5,
    streams: []
  }

  componentWillMount(){
    return getStreams({user_id: this.props.match.params.id, offset: 0, limit: 5})
      .then(({streams}) => Promise.resolve(this.props.addNormalizedStreamsData(reduceStreamsToNormalized(streams)))
        .then(_ => this.setState({streams: streams.map(s => s.id)}) ))
      .then(_ => getUser(this.props.match.params.id).then(user => this.props.addUsers({[user.id]: user})));
  }

  render() {
    return(
      <div className={styles.profile}>
        <div className={styles.content}>
          <div className={styles.userInfo}>
            <img src={this.props.user.avatar_url} alt='avatar' className={styles.avatar} />
            <div className={styles.info}>
              <div className={styles.name}>{this.props.user.name}</div>
              <div className={styles.followersCount}>{this.props.user.followers_count} followers</div>
            </div>
          </div>

          <div className={styles.streams}>
            {this.state.streams.map(streamId => (<Stream key={streamId} id={streamId} />))}
          </div>
        </div>
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Profile);
