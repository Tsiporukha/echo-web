import {PLAY, PAUSE, CLEAR_PLAYER, SET_CURRENT_SONG} from "../constants/ActionTypes";


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clear = () => ({type: CLEAR_PLAYER});

export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  payload: song
});


const isSong = item => item.type === 'song';
const getCollection = type => `${type}s`
const getSongIndex = (songs, song) => songs.findIndex(sng => sng.id === song.id);
const getNextSongIndex = (currentSongIndex, songsLength) => currentSongIndex === songsLength - 1 ? 0 : currentSongIndex + 1;
const getPrevSongIndex = (currentSongIndex, songsLength) => currentSongIndex === 0 ? songsLength - 1 : currentSongIndex - 1;

const getHolderPlaylist = (playlists, holder) => playlists[holder.playlist];
const getPlaylistSongs = (songs, playlist) => playlist.songs.map(songId => songs[songId]);
const getHolderSongs = (songs, playlists, holder) => getPlaylistSongs(songs, getHolderPlaylist(playlists, holder));

export const getQueueSongs = store =>
  store.queue.items.reduce(
    (songs, s) => songs.concat(isSong(s) ?
      store.songs[s.id] :
      getHolderSongs(store.songs, store.playlists, store[getCollection(s.type)][s.id])),
    []
  );


const getNextSongId = (queueSongs, currentSong) => currentSong.id && queueSongs[getNextSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;
const getPrevSongId = (queueSongs, currentSong) => currentSong.id && queueSongs[getPrevSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;

export const getNextSong = store => store.songs[getNextSongId(getQueueSongs(store), store.player.currentSong)];
export const getPrevSong = store => store.songs[getPrevSongId(getQueueSongs(store), store.player.currentSong)];
