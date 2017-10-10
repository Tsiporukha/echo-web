import {connect} from 'react-redux';

import StreamEditing from '../components/StreamEditing';

import {getQueueSongs} from '../actions/PlayerActions';
import {publish} from '../actions/QueueActions';


const mapStateToProps = (state, ownProps) => ({
  songs: getQueueSongs(state),
  token: state.session.token
});

const mapDispatchToProps = dispatch => ({
  save: (playlist_title, playlist_description, tags, default_artwork_url, songs, token) =>
    dispatch(publish(playlist_title, playlist_description, tags, default_artwork_url, songs, token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(StreamEditing);
