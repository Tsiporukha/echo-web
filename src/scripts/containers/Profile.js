import React, {Component} from 'react';
import {connect} from 'react-redux';

import Stream from './Stream';

import {addUsers, addNormalizedStreamsData} from '../actions/EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {getUser} from '../lib/ebApi/users';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';

import styles from '../../assets/styles/profile.css';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id],
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUsers({[user.id]: user})),
  addNormalizedStreamsData: normalizedData => dispatch(addNormalizedStreamsData(normalizedData))
});

class Profile extends Component {

  initialLoad = (token = this.props.token) => getStreams({user_id: this.props.match.params.id, offset: 0, limit: 5}, token)
    .then(({streams}) => Promise.resolve(this.props.addNormalizedStreamsData(reduceStreamsToNormalized(streams)))
      .then(_ => this.setState({streams: streams.map(s => s.id)}) ))
    .then(_ => getUser(this.props.match.params.id).then(user => this.props.addUser(user)));

  reloadOnTokenChange = (nextProps, props) => nextProps.token !== props.token ? this.initialLoad(nextProps.token) : false;

  state = {
    offset: 0,
    limit: 5,
    streams: []
  }

  componentWillMount = () => this.initialLoad(this.props.token);

  componentWillReceiveProps = nextProps => this.reloadOnTokenChange(nextProps, this.props);

  render() {
    return(
      !!this.props.user &&
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
