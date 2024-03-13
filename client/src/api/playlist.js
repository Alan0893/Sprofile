import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => 
	axios.get('https://api.spotify.com/v1/me/playlists', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Create a Playlist (The playlist will be empty until you add tracks)
 * https://developer.spotify.com/documentation/web-api/reference/create-playlist/
 */
export const createPlaylist = (userId, name) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: 'post', url, headers, data });
};

//*********************************************************************************************************************************
/**
 * Add Tracks to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = (playlistId, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url, headers });
};

//*********************************************************************************************************************************
/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist/
 */
export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks/
 */
export const getPlaylistTracks = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });


