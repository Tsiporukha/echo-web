export const getPlayAction = (isCurrentSong, playCurrentSong, setCurrentSong) => isCurrentSong ? playCurrentSong : setCurrentSong;
export const getLikeAction = (song, token, toggleLike, showLogin) => () => token ? toggleLike(song, token) : showLogin();
