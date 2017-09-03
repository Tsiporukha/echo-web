import {PLAY, PAUSE, CLEAR_PLAYER, SET_CURRENT_SONG} from "../constants/ActionTypes";


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clear = () => ({type: CLEAR_PLAYER});

export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  payload: song
});


const isSong = item => item.type === 'song';
const getSongIndex = (songs, song) => songs.findIndex(sng => sng.id === song.id);
const getNextSongIndex = (currentSongIndex, songsLength) => currentSongIndex === songsLength - 1 ? 0 : currentSongIndex + 1;
const getPrevSongIndex = (currentSongIndex, songsLength) => currentSongIndex === 0 ? songsLength - 1 : currentSongIndex - 1;

const getStreamPlaylist = (playlists, stream) => playlists[stream.playlist];
const getPlaylistSongs = (songs, playlist) => playlist.songs.map(songId => songs[songId]);
const getStreamSongs = (songs, playlists, stream) => getPlaylistSongs(songs, getStreamPlaylist(playlists, stream));

export const getQueueSongs = store =>
  store.queue.items.reduce((songs, s) => songs.concat(isSong(s) ? store.songs[s.id] : getStreamSongs(store.songs, store.playlists, store.streams[s.id])), []);


const getNextSongId = (queueSongs, currentSong) => currentSong.id && queueSongs[getNextSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;
const getPrevSongId = (queueSongs, currentSong) => currentSong.id && queueSongs[getPrevSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;

export const getNextSong = store => store.songs[getNextSongId(getQueueSongs(store), store.player.currentSong)];
export const getPrevSong = store => store.songs[getPrevSongId(getQueueSongs(store), store.player.currentSong)];
