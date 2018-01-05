import {PLAY, PAUSE, CLEAR_PLAYER, SET_CURRENT_SONG} from "../constants/ActionTypes";
import {getPlaylistSongs, getHolderSongs} from './EntitiesAUDActions';
import {getCollectionName, getIndexById} from '../lib/base';
import {isSong} from '../lib/song';


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clear = () => ({type: CLEAR_PLAYER});

export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  payload: song
});


const getNextSongIndex = (currentSongIndex, songsLength) => currentSongIndex === songsLength - 1 ? 0 : currentSongIndex + 1;
const getPrevSongIndex = (currentSongIndex, songsLength) => currentSongIndex === 0 ? songsLength - 1 : currentSongIndex - 1;


export const getQueueSongs = store =>
  store.queue.items.reduce(
    (songs, s) => songs.concat(isSong(s) ?
      store.songs[s.id] :
      getHolderSongs(store.songs, store.playlists, store[getCollectionName(s.type)][s.id])),
    []
  );


const getCurrentSongPlaylistSongs = store => store.player.currentSong.playlist ?
  getPlaylistSongs(store.songs, store.playlists[store.player.currentSong.playlist])
  : getQueueSongs(store);


const getNextSongId = (playlistSongs, currentSong) => currentSong.id &&
  playlistSongs[getNextSongIndex(getIndexById(playlistSongs, currentSong), playlistSongs.length)].id;
const getPrevSongId = (playlistSongs, currentSong) => currentSong.id &&
  playlistSongs[getPrevSongIndex(getIndexById(playlistSongs, currentSong), playlistSongs.length)].id;

export const getNextSong = store => store.songs[getNextSongId(getCurrentSongPlaylistSongs(store), store.player.currentSong)];
export const getPrevSong = store => store.songs[getPrevSongId(getCurrentSongPlaylistSongs(store), store.player.currentSong)];
