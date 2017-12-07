import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Tab, Tabs, Button} from 'react-toolbox';

import RoomCard from '../components/RoomCard';
import ShareIconMenu from '../components/ShareIconMenu';
import Song from './Song';

import {normalizeAndAddRooms} from '../actions/EntitiesAUDActions';

import {maybeGetWithNestedEntities} from '../lib/room';

import styles from '../../assets/styles/room.css';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetWithNestedEntities(state, ownProps.match.params.id),
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
});


class Room extends Component {

  handleTabChange = index => this.setState({index});


  state = {
    index: 0,
  }

  //  componentWillMount = () => this.props.fetchRoom(this.props.match.params.id, this.props.token);

  render(){
    return (
      !!this.props.room &&
      <div className={styles.root}>

        <div className={styles.left}>

          <div className={styles.roomHeader} style={{backgroundImage: `url(${this.props.room.background_url})`}}>
            <RoomCard room={this.props.room} playlist={this.props.playlist} />
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
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
