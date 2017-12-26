import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ShareIconMenu from '../components/ShareIconMenu';
import RoomEditing from '../components/RoomEditing';
import AddToQueueButton from './AddToQueueButton';

import {receiveRooms} from '../actions/EntitiesAUDActions';

import {maybeGetWithNestedEntities} from '../lib/room';
import {update} from '../lib/ebApi/rooms';

import styles from '../../assets/styles/card.css';


const mapStateToProps = (state, ownProps) => ({
  ...maybeGetWithNestedEntities(state, ownProps.id),
  token: state.session.token,
  currentUserId: !!state.session.user && state.session.user.id,
});

const mapDispatchToProps = dispatch => ({
  update: roomId => (artwork_url, background_url, title, description, genre, tags, songs, token) =>
    update(roomId, artwork_url, background_url, title, description, genre, tags, songs, token).then(room => dispatch(receiveRooms([room]))),
});

class RoomCard extends Component {

  editable = this.props.room.moderators_ids.includes(this.props.currentUserId)

  toggleRoomEditing = () => this.setState({roomEditing: !this.state.roomEditing});


  state = {
    roomEditing: false,
  }

  render(){
    return(
      <div className={styles.root}>
        <img className={styles.artwork} src={this.props.room.artwork_url} alt='room artwork' />
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
              <span onClick={this.toggleRoomEditing}>Edit</span>
              {this.state.roomEditing && <RoomEditing
                onCancel={this.toggleRoomEditing} save={this.props.update(this.props.room.id)}
                room={this.props.room} playlist={this.props.playlist} songs={this.props.songs}
                token={this.props.token}
              />}
            </div>}
          </div>
          <div className={styles.description}> {this.props.playlist.description} </div>
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);
