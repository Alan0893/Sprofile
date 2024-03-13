import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Playback State
 * https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
 */
export const getPlaybackState = () =>
  axios.get('https://api.spotify.com/v1/me/player', { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Transfer Playback
 * https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
 */
export const transferPlayback = (device_id) =>
  axios.put('https://api.spotify.com/v1/me/player', { device_ids: [device_id] }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Available Devices
 * https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
 */
export const getAvailableDevices = () =>
  axios.get('https://api.spotify.com/v1/me/player/devices', { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Currently Playing Track
 * https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 */
export const getCurrentlyPlaying = () =>
  axios.get('https://api.spotify.com/v1/me/player/currently-playing', { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Start/Resume Playback
 * https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
 */
export const startPlayback = (uris, position_ms = 0) =>
  axios.put('https://api.spotify.com/v1/me/player/play', { uris, position_ms }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Pause Playback
 * https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
 */
export const pausePlayback = () =>
  axios.put('https://api.spotify.com/v1/me/player/pause', null, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Skip To Next
 * https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
 */
export const skipToNext = () =>
  axios.post('https://api.spotify.com/v1/me/player/next', null, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Skip To Previous
 * https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
 */
export const skipToPrevious = () =>
  axios.post('https://api.spotify.com/v1/me/player/previous', null, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Seek To Position
 * https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
 */
export const seekToPosition = (position_ms) =>
  axios.put('https://api.spotify.com/v1/me/player/seek', { position_ms }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Set Repeat Mode
 * https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
 */
export const setRepeatMode = (state) =>
  axios.put('https://api.spotify.com/v1/me/player/repeat', { state }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Set Playback Volume
 * https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
 */
export const setVolume = (volume_percent) =>
  axios.put('https://api.spotify.com/v1/me/player/volume', { volume_percent }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Toggle Playback Shuffle
 * https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
 */
export const toggleShuffle = (state) =>
  axios.put('https://api.spotify.com/v1/me/player/shuffle', { state }, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-recently-played/
 */
export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get the User's Queue
 * https://developer.spotify.com/documentation/web-api/reference/get-queue/
 */
export const getQueue = () =>
  axios.get('https://api.spotify.com/v1/me/player/queue', { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Add an Item to the User's Queue
 * https://developer.spotify.com/documentation/web-api/reference/add-to-queue/
 */
export const addToQueue = (uri) =>
  axios.post('https://api.spotify.com/v1/me/player/queue', { uri }, { 
    headers 
  });