// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Get duration of the Playlist 
export const getPlaylistDuration = (playlist) => {
  const totalDurationMs = playlist.tracks.items.reduce((total, { track }) => total + track.duration_ms, 0);
  const totalDurationMinutes = totalDurationMs / 60000;
  const hours = Math.floor(totalDurationMinutes / 60); 
  const minutes = Math.floor(totalDurationMinutes % 60);
  const seconds = Math.floor((totalDurationMinutes * 60) % 60);
  
  let durationString = "";
  if (hours > 0) { durationString += `${hours}h `; }
  if (minutes > 0) { durationString += `${minutes}m `; }
  if (seconds > 0) { durationString += `${seconds}s`; }
  
  return durationString.trim();
};

// Get duration of the Album 
export const getAlbumDuration = (playlist) => {
  const totalDurationMs = playlist.tracks.items.reduce((total, track ) => total + track.duration_ms, 0);
  const totalDurationMinutes = totalDurationMs / 60000;
  const hours = Math.floor(totalDurationMinutes / 60); 
  const minutes = Math.floor(totalDurationMinutes % 60);
  const seconds = Math.floor((totalDurationMinutes * 60) % 60);
  
  let durationString = "";
  if (hours > 0) { durationString += `${hours}h `; }
  if (minutes > 0) { durationString += `${minutes}m `; }
  if (seconds > 0) { durationString += `${seconds}s`; }
  
  return durationString.trim();
};

// Format milliseconds into MM:SS
export const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Format milliseconds into X minutes and Y seconds
export const formatDurationForHumans = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes} Mins ${seconds} Secs`;
};

// Get year from YYYY-MM-DD
export const getYear = date => date.split('-')[0];

// Reformat YYYY-MM-DD to Month DD, YYYY
export const formatDate = (inputDate) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = inputDate.split('-');
  const monthName = months[parseInt(month) - 1];
  const formattedDate = `${monthName} ${parseInt(day)}, ${year}`;
  return formattedDate;
}

// Transform Pitch Class Notation to string
export const parsePitchClass = note => {
  let key = note;

  switch (note) {
    case 0:
      key = 'C';
      break;
    case 1:
      key = 'D♭';
      break;
    case 2:
      key = 'D';
      break;
    case 3:
      key = 'E♭';
      break;
    case 4:
      key = 'E';
      break;
    case 5:
      key = 'F';
      break;
    case 6:
      key = 'G♭';
      break;
    case 7:
      key = 'G';
      break;
    case 8:
      key = 'A♭';
      break;
    case 9:
      key = 'A';
      break;
    case 10:
      key = 'B♭';
      break;
    case 11:
      key = 'B';
      break;
    default:
      return null;
  }

  return key;
};

export const formatWithCommas = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Higher-order function for async/await error handling
export const catchErrors = fn =>
  function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };


export const findImageWithRatio = (images) => {
  for (const image of images) {
    if (image.ratio === '4_3') {
      return image.url;
    }
  }
  return images[0].url;
}
  