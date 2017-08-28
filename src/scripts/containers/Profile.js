import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Tab, Tabs} from 'react-toolbox';

import Stream from './Stream';
import UserLikes from './UserLikes';

import {addUsers, addNormalizedStreamsData, followUser, unfollowUser} from '../actions/EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {getUser} from '../lib/ebApi/users';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';

import styles from '../../assets/styles/profile.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.match.params.id],
  token: state.session.token,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUsers({[user.id]: user})),
  addNormalizedStreamsData: normalizedData => dispatch(addNormalizedStreamsData(normalizedData)),
  follow: (user, token) => dispatch(followUser(user, token)),
  unfollow: (user, token) => dispatch(unfollowUser(user, token)),
});

const initialState = {
  offset: 0,
  limit: 5,
  streams: [],

  tab: 0,
};

class Profile extends Component {

  handleTabChange = tab => this.setState({tab});

  initialLoad = (token = this.props.token) => getStreams({user_id: this.props.match.params.id, offset: 0, limit: 5}, token)
    .then(({streams}) => Promise.resolve(this.props.addNormalizedStreamsData(reduceStreamsToNormalized(streams)))
      .then(_ => this.setState({streams: streams.map(s => s.id)}) ))
    .then(_ => getUser(this.props.match.params.id, token).then(user => this.props.addUser(user)));

  reloadOnTokenChange = (nextProps, props) => nextProps.token !== props.token ? this.initialLoad(nextProps.token) : false;
  reinitOnUserChange = (nextProps, props) => nextProps.match.params.id !== props.match.params.id ?
    Promise.resolve(this.setState(initialState)).then(this.initialLoad) : false;

  follow = () => this.props.follow(this.props.user, this.props.token);
  unfollow = () => this.props.unfollow(this.props.user, this.props.token);


  state = {...initialState};

  componentWillMount = () => this.initialLoad(this.props.token);

  componentWillReceiveProps = nextProps => this.reinitOnUserChange(nextProps, this.props) || this.reloadOnTokenChange(nextProps, this.props);

  render() {
    return(
      !!this.props.user &&
      <div className={styles.profile}>
        <div className={styles.content}>
          <div className={styles.userData}>
            <div className={styles.userInfo}>
              <img src={this.props.user.avatar_url} alt='avatar' className={styles.avatar} />
              <div className={styles.info}>
                <div className={styles.name}>{this.props.user.name}</div>
                <div className={styles.followersCount}>{this.props.user.followers_count} followers</div>
              </div>
              {this.props.token && (this.props.user.id !== this.props.currentUser.id) && (this.props.user.is_followed ?
                <Button onClick={this.unfollow} className={styles.followedBtn} icon='done' label='followed' raised primary /> :
                <Button onClick={this.follow} className={styles.followBtn} icon='add' label='follow' raised primary />
              )}
            </div>


            <Tabs theme={tabsTheme} index={this.state.tab} onChange={this.handleTabChange}>
              <Tab label={<i className={styles.feedIcon}>language</i>}>
                {this.state.streams.map(streamId => (<Stream key={streamId} id={streamId} />))}
              </Tab>
              <Tab label={<i className={styles.favoriteIcon}>favorite</i>}>
                <UserLikes userId={this.props.user.id} />
              </Tab>
            </Tabs>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
