import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Tab, Tabs} from 'react-toolbox/lib/tabs';

import Stream from './Stream';
import UserLikes from './UserLikes';
import User from './User';
import SimilarUsers from './SimilarUsers';
import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';

import {receiveStreams} from '../actions/EntitiesAUDActions';

import {get as getStreams} from '../lib/ebApi/streams';
import {dispatchOnBottomReaching} from '../lib/scroll';

import styles from '../../assets/styles/profile.css';
import tabsTheme from '../../assets/styles/tabsTheme.css';


const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  receiveStreams: streams => dispatch(receiveStreams(streams)),
});

const initialState = {
  offset: 0,
  limit: 5,
  streams: [],

  tab: 0,
};

class Profile extends Component {
  setAttr = name => val => this.setState({[name]: val});

  receiveStreams = ({streams}) => {
    this.props.receiveStreams(streams);
    return this.setState({streams: this.state.streams.concat(streams.map(s => s.id))});
  };
  getStreams = (offset, token) => getStreams(
    {user_id: this.props.match.params.id, offset: this.state.streams.length, limit: 5},
    token
  ).then(this.receiveStreams);

  loadStreams = (token = this.props.token) => doWithProgressLine(
    () => this.getStreams(this.state.streams.length, token),
    this.setAttr('fetching')
  );
  reinit = () => this.setState(initialState, this.loadStreams);

  reinitPropsChanged = (nextProps, props) =>
    nextProps.token !== props.token
    || nextProps.match.params.id !== props.match.params.id
  ;

  dispatchScrollListener = actionName =>
    dispatchOnBottomReaching(() => window, this.loadStreams)(actionName);


  state = {
    ...initialState,
    fetching: false,
  };

  componentDidMount = () => {
    this.loadStreams();
    return this.dispatchScrollListener('addEventListener');
  };

  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');


  componentWillReceiveProps = nextProps => this.reinitPropsChanged(nextProps, this.props) && this.reinit();


  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <User id={this.props.match.params.id} withOG />

          <Tabs theme={tabsTheme} index={this.state.tab} onChange={this.setAttr('tab')}>
            <Tab label={<i className={styles.feedIcon}>language</i>}>
              <div>
                {this.state.streams.map(streamId => (<Stream key={streamId} id={streamId} />))}
              </div>
            </Tab>
            <Tab label={<i className={styles.favoriteIcon}>favorite</i>}>
              <UserLikes userId={this.props.match.params.id} />
            </Tab>
          </Tabs>
        </div>

        <div className={styles.right}>
          <SimilarUsers userId={this.props.match.params.id} />
        </div>

        <IndeterminateProgressLine visible={this.state.fetching} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
