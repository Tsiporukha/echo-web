import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Tab, Tabs, Button} from 'react-toolbox';

import RoomCard from '../components/RoomCard';
import ShareIconMenu from '../components/ShareIconMenu';
import Song from './Song';
import IndeterminateProgressLine, {doWithProgressLine} from '../components/IndeterminateProgressLine';

import {fetchRoom} from '../actions/EntitiesAUDActions';

import {maybeGetWithNestedEntities} from '../lib/room';

import styles from '../../assets/styles/room.css';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetWithNestedEntities(state, ownProps.match.params.id),
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  fetchRoom: (id, token) => dispatch(fetchRoom(id, token)),
});


class Room extends Component {

  handleTabChange = index => this.setState({index});

  setFetching = fetching => this.setState({fetching});
  fetchRoom = () => doWithProgressLine(() => this.props.fetchRoom(this.props.match.params.id, this.props.token), this.setFetching);


  state = {
    index: 0,
    fetching: false,
  }

  componentWillMount = this.fetchRoom;

  render(){
    return (
      !!this.props.room &&
      <div className={styles.root}>

        <div className={styles.left}>

          <div className={styles.roomHeader} style={{backgroundImage: `url(${this.props.room.background_url})`}}>
            <RoomCard room={this.props.room} playlist={this.props.playlist} songs={this.props.songs} />
          </div>

          <div className='roomTabs'>
            <Tabs theme={styles} index={this.state.index} onChange={this.handleTabChange}>
              <Tab label={`TRACKLIST(${this.props.playlist.songs.length})`}>
                <div>
                  <div className={styles.tags}>
                    <span>Tags:</span>

                    {this.props.room.tags.map(tag => (<span key={tag} className={styles.tag}>#{tag}</span>))}
                  </div>

                  {this.props.playlist.songs.map(id => (<Song key={id} id={id} />))}
                </div>
              </Tab>
              <Tab label={`EVENTS 0`} disabled />
            </Tabs>
          </div>

        </div>

        <div className={styles.right}>
          SIMILAR ROOMS
        </div>

        <IndeterminateProgressLine visible={this.state.fetching} />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
