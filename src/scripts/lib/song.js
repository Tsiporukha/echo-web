export const getPlayAction = (isCurrentSong, playCurrentSong, setCurrentSong) => isCurrentSong ? playCurrentSong : setCurrentSong;
export const getLikeAction = (song, token, toggleLike, showLogin) => () => token ? toggleLike(song, token) : showLogin();

export const addSongType = song => ({type: 'song', ...song});
export const addSongsType = songs => songs.map(addSongType);
