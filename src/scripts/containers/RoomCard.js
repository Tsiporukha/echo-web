import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Switch from 'react-toolbox/lib/switch';

import ShareIconMenu from '../components/ShareIconMenu';
import RoomEditing from '../components/RoomEditing';
import AddToQueueButton from './AddToQueueButton';

import {receiveRooms, maybeGetHolderPlaylist, concatSong} from '../actions/EntitiesAUDActions';
import {addClonedPlaylistHolderToTopAndPlay, addClonedPlaylistHolderToTop} from '../actions/QueueActions';
import {pause, play, setCurrentSong} from '../actions/PlayerActions';

import {maybeGetWithNestedEntities} from '../lib/room';
import {update} from '../lib/ebApi/rooms';

import styles from '../../assets/styles/card.css';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetWithNestedEntities(state, ownProps.id),
  token: state.session.token,
  currentUserId: !!state.session.user && state.session.user.id,

  getHolderPlaylist: holder => maybeGetHolderPlaylist(state, holder),
});

const mapDispatchToProps = dispatch => ({
  addToQueueTopAndPlay: (room, playlist, songs) => dispatch(addClonedPlaylistHolderToTopAndPlay('room')(room, playlist, songs)),
  addToQueueTop: (room, playlist, songs) => dispatch(addClonedPlaylistHolderToTop('room')(room, playlist, songs)),
  setCurrentSong: song => dispatch(setCurrentSong(song)),
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),

  concatSong: (playlist, song) => concatSong(playlist, song)(dispatch),

  update: roomId => (artwork_url, background_url, title, description, genre, tags, songs, token) =>
    update(roomId, artwork_url, background_url, title, description, genre, tags, songs, token).then(room => dispatch(receiveRooms([room]))),
});

class RoomCard extends Component {

  editable = this.props.room.moderators_ids.includes(this.props.currentUserId)

  toggle = key => () => this.setState({[key]: !this.state[key]});

  addAndPlayFirstSong = () => Promise.resolve(this.props.addToQueueTop(this.props.room, this.props.playlist, []).payload[0])
    .then(holder => {
      this.props.concatSong(this.props.getHolderPlaylist(holder), this.props.songs[0]);
      return this.props.setCurrentSong({...this.props.songs[0], playlist: this.props.playlist.id, holder});
    });

  play = () => this.state.fullAdding ?
    this.props.addToQueueTopAndPlay(this.props.room, this.props.playlist, this.props.songs) : this.addAndPlayFirstSong();


  state = {
    roomEditing: false,
    fullAdding: true,
  }

  render(){
    return(
      <div className={styles.root}>
        <div className={styles.artwork}>
          <img className={styles.artwork} src={this.props.room.artwork_url} alt='room artwork' />

          <span className={styles.playPause}>
            {this.props.isPlaying ?
              <i onClick={this.props.pause} className={styles.playIcon}>pause</i>
              :
              <i onClick={this.props.inQueue ? this.props.play : this.play}
                className={styles.playIcon}>play_arrow</i>
            }
          </span>
        </div>
        <div className={styles.data}>
          <div className={styles.titleBlock}>
            <div className={styles.title}>
              <Link to={`/genres/${this.props.room.genre}/rooms/${this.props.room.id}`}> {this.props.playlist.title} </Link>
            </div>
            <div>
              <ShareIconMenu path={`/genres/${this.props.room.genre}/rooms/${this.props.room.id}`} picture={this.props.room.artwork_url}
                title={this.props.playlist.title} description={this.props.playlist.description} />
              <AddToQueueButton type='room' holder={this.props.room} playlist={this.props.playlist} songs={this.props.songs} />
            </div>
            {this.editable && <div className={styles.editBlock}>
              <span onClick={this.toggle('roomEditing')}>Edit</span>
              {this.state.roomEditing && <RoomEditing
                onCancel={this.toggle('roomEditing')} save={this.props.update(this.props.room.id)}
                room={this.props.room} playlist={this.props.playlist} songs={this.props.songs}
                token={this.props.token}
              />}
            </div>}
          </div>
          <div className={styles.description}> {this.props.playlist.description} </div>
          <Switch
            checked={this.state.fullAdding}
            label='Add full playlist'
            onChange={this.toggle('fullAdding')}
          />
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);
