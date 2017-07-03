import {PLAY, PAUSE, CLEAN_PLAYER, SET_CURRENT_SONG} from "../constants/ActionTypes";


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clean = () => ({type: CLEAN_PLAYER});

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

const getQueueSongs = state =>
  state.queue.items.reduce((songs, s) => songs.concat(isSong(s) ? s : getStreamSongs(state.songs, state.playlists, state.streams[s.id])), []);


const getNextSongId = (queueSongs, currentSong) => queueSongs[getNextSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;
const getPrevSongId = (queueSongs, currentSong) => queueSongs[getPrevSongIndex(getSongIndex(queueSongs, currentSong), queueSongs.length)].id;

export const getNextSong = state => state.songs[getNextSongId(getQueueSongs(state), state.player.currentSong)];
export const getPrevSong = state => state.songs[getPrevSongId(getQueueSongs(state), state.player.currentSong)];
