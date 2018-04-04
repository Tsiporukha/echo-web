import {PLAY, PAUSE, CLEAR_PLAYER, SET_CURRENT_SONG} from '../constants/ActionTypes';
import {getPlaylistSongs, getHolderSongs} from './EntitiesAUDActions';
import {getCollectionName, getIndexById} from '../lib/base';
import {isSong} from '../lib/song';


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clear = () => ({type: CLEAR_PLAYER});

export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  payload: song,
});


const getNextSongIndex = (currentSongIndex, songsLength) =>
  currentSongIndex === songsLength - 1 ? 0 : currentSongIndex + 1;

const getPrevSongIndex = (currentSongIndex, songsLength) =>
  currentSongIndex === 0 ? songsLength - 1 : currentSongIndex - 1;


export const getQueueSongs = state =>
  state.queue.items.reduce(
    (songs, s) => songs.concat(isSong(s) ?
      state.songs[s.id] :
      getHolderSongs(state.songs, state.playlists, state[getCollectionName(s.type)][s.id])),
    []
  );


const getCurrentSongPlaylistSongs = state => state.player.currentSong.playlist ?
  getPlaylistSongs(state.songs, state.playlists[state.player.currentSong.playlist]) :
  getQueueSongs(state);


const getValidIndex = (playlistSongs, currentSong, getIndex) => {
  const index = getIndex(getIndexById(playlistSongs, currentSong), playlistSongs.length);
  return index < 0 ? 0 : index;
};

const getSeqSongId = getIndex => (playlistSongs, currentSong) => (currentSong || {}).id &&
  playlistSongs[getValidIndex(playlistSongs, currentSong, getIndex)].id;

const getNextSongId = getSeqSongId(getNextSongIndex);
const getPrevSongId = getSeqSongId(getPrevSongIndex);


export const getNextSong = state =>
  state.songs[getNextSongId(getCurrentSongPlaylistSongs(state), state.player.currentSong)];
export const getPrevSong = state => state.songs[getPrevSongId(getCurrentSongPlaylistSongs(state), state.player.currentSong)];
