import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GenreCard from '../components/GenreCard';
import RoomCard from './RoomCard';
import TagsSelect from '../components/TagsSelect';

import {receiveRooms} from '../actions/EntitiesAUDActions';

import {withGenre as fetchRooms} from '../lib/ebApi/rooms';
import {getGenre, getGenreTags} from '../lib/genres';
import {dispatchOnBottomReaching} from '../lib/scroll';

import styles from '../../assets/styles/genre.css';
import feedStyles from '../../assets/styles/feed.css';


const mapStateToProps = (state, ownProps) => ({
  token: state.session.token,
  rooms: Object.values(state.rooms).filter(room => room.genre === ownProps.match.params.title)
    .sort((a, b) => b.timestamp - a.timestamp).map(room => room.id),
});

const mapDispatchToProps = dispatch => ({
  fetchAndReceiveRooms: (filters, token) => fetchRooms(filters, token)
    .then(({rooms, count, _totalAvailable}) => Promise.resolve(dispatch(receiveRooms(rooms)))
      .then(_ => ({rooms: rooms.map(room => room.id), fetchedAll: count < filters.limit}))
    ),
});


class Genre extends Component {
  static propTypes = {
    token: PropTypes.string,
    rooms: PropTypes.array,

    fetchAndReceiveRooms: PropTypes.func,

    match: PropTypes.object,
  };

  genre = getGenre(this.props.match.params.title);
  tags = getGenreTags(this.props.match.params.title);

  getRequestFilters = ({tags, limit, offset} = this.state) => ({genre: this.genre.title, tags, limit, offset});
  maybeConcatWithStateRooms = rooms => this.state.offset ? this.state.rooms.concat(rooms) : rooms;
  getNewState = (rooms, fetchedAll) => ({rooms, offset: rooms.length, fetchedAll});

  fetchAndReceiveRooms = () => this.state.fetchedAll ||
    this.props.fetchAndReceiveRooms(this.getRequestFilters(), this.props.token)
      .then(({rooms, fetchedAll}) => this.setState(this.getNewState(this.maybeConcatWithStateRooms(rooms), fetchedAll)));

  setTags = tags => this.setState({tags});
  handleTagClick = _ => this.setState({offset: 0, fetchedAll: false}, this.fetchAndReceiveRooms);

  dispatchScrollListener = actionName =>
    dispatchOnBottomReaching(() => window, this.fetchAndReceiveRooms)(actionName);


  state = {
    offset: 0,

    rooms: this.props.rooms,
    tags: [],
  }

  componentDidMount = () => this.fetchAndReceiveRooms().then(this.dispatchScrollListener('addEventListener'));

  componentWillUnmount = () => this.dispatchScrollListener('removeEventListener');

  render() {
    return (
      <div className={styles.genre}>

        <div className={styles.left}>

          <div className={styles.genreHeader} style={{backgroundImage: `url(${this.genre.background_url})`}}>
            <GenreCard genre={this.genre} />
          </div>

          <div className={styles.leftContent}>
            <div className={styles.tags}>
              <span className={styles.t}>Tags:</span>
              <TagsSelect
                allTags={this.tags}
                selectedTags={this.state.tags}
                setTags={this.setTags}
                handleTagClick={this.handleTagClick}
                theme={feedStyles}
              />
            </div>

            {this.state.rooms.map(roomId => <RoomCard key={roomId} id={roomId} />)}
          </div>

        </div>

        <div className={styles.right}>
          SIMILAR ROOMS
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
