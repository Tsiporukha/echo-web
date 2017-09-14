import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Tab, Tabs} from 'react-toolbox';

import Stream from './Stream';
import UserLikes from './UserLikes';
import User from './User';
import SimilarUsers from './SimilarUsers';
import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';

import {addUsers, addNormalizedStreamsData, followUser, unfollowUser} from '../actions/EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {getUser} from '../lib/ebApi/users';
import {reduceToNormalized as reduceStreamsToNormalized} from '../lib/stream';

import styles from '../../assets/styles/profile.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


const mapStateToProps = (state, ownProps) => ({
  present: !!state.users[ownProps.match.params.id],
  token: state.session.token,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUsers({[user.id]: user})),
  addNormalizedStreamsData: normalizedData => dispatch(addNormalizedStreamsData(normalizedData)),
});

const initialState = {
  offset: 0,
  limit: 5,
  streams: [],

  tab: 0,
};

class Profile extends Component {

  handleTabChange = tab => this.setState({tab});

  setFetching = fetching => this.setState({fetching});
  initialLoad = (token = this.props.token) => doWithProgressLine(() => this.initLoad(token), this.setFetching);

  initLoad = token => getStreams({user_id: this.props.match.params.id, offset: 0, limit: 5}, token)
    .then(({streams}) => Promise.resolve(this.props.addNormalizedStreamsData(reduceStreamsToNormalized(streams)))
      .then(_ => this.setState({streams: streams.map(s => s.id)}) ))
    .then(_ => getUser(this.props.match.params.id, token).then(user => this.props.addUser(user)));

  reloadOnTokenChange = (nextProps, props) => nextProps.token !== props.token ? this.initialLoad(nextProps.token) : false;
  reinitOnUserChange = (nextProps, props) => nextProps.match.params.id !== props.match.params.id ?
    Promise.resolve(this.setState(initialState)).then(this.initialLoad) : false;


  state = {
    ...initialState,
    fetching: false,
  };

  componentWillMount = () => this.initialLoad(this.props.token);

  componentWillReceiveProps = nextProps => this.reinitOnUserChange(nextProps, this.props) || this.reloadOnTokenChange(nextProps, this.props);

  render() {
    return(
      <div className={styles.profile}>
        <div className={styles.leftReg}>
          <div className={styles.userData}>
            {this.props.present && <User id={this.props.match.params.id} />}

            <Tabs theme={tabsTheme} index={this.state.tab} onChange={this.handleTabChange}>
              <Tab label={<i className={styles.feedIcon}>language</i>}>
                {this.state.streams.map(streamId => (<Stream key={streamId} id={streamId} />))}
              </Tab>
              <Tab label={<i className={styles.favoriteIcon}>favorite</i>}>
                <UserLikes userId={this.props.match.params.id} />
              </Tab>
            </Tabs>
          </div>
        </div>

        <div className={styles.rightReg}>
          <SimilarUsers userId={this.props.match.params.id} />
        </div>

        <IndeterminateProgressLine visible={this.state.fetching} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
