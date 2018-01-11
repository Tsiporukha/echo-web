export const isSong = item => item.type === 'song';

export const getPlayAction = (isCurrentSong, playCurrentSong, setCurrentSong) => isCurrentSong ? playCurrentSong : setCurrentSong;
export const getLikeAction = (song, token, toggleLike, showLogin) => () => token ? toggleLike(song, token) : showLogin();

export const addSongType = song => ({type: 'song', ...song});
export const addSongsType = songs => songs.map(addSongType);

export const addPlaylistId = (song, playlist) => Object.assign({}, song, playlist ? {playlist: playlist.id} : {});
