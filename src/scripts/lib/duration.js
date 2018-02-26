const getTwoChars = num => `0${num}`.substr(-2);
const concatWithColon = (a, b) => `${a}:${getTwoChars(b)}`;

export const duration = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);
  return concatWithColon(hours ? concatWithColon(hours, minutes) : minutes, seconds);
};

export const withHours = totalSeconds => {
  const drtn = duration(totalSeconds);
  return `${'00:00:00'.substring(0, (8 - drtn.length))}${drtn}`;
};

export const playlistDuration = songs => songs.reduce((td, sng) => td + sng.duration, 0);

export const queueDuration = queue => queue.reduce((td, s) => td + (s.data_url ? s.duration : playlistDuration(s.playlist.songs)), 0);
