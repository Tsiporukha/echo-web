import {connect} from 'react-redux';

import RoomEditing from '../components/RoomEditing';

import {getQueueSongs} from '../actions/PlayerActions';
import {create} from '../lib/ebApi/rooms';


const mapStateToProps = (state, ownProps) => ({
  songs: getQueueSongs(state),
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  save: (artwork_url, background_url, title, description, genre, tags, songs, token) =>
    create(artwork_url, background_url, title, description, genre, tags, songs, token),
});


export default connect(mapStateToProps, mapDispatchToProps)(RoomEditing);
