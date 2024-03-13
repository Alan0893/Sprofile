import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist/
 */
export const getPlaylist = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Change Playlist Details
 * https://developer.spotify.com/documentation/web-api/reference/change-playlist-details/
 */
export const changePlaylistDetails = (playlistId, name, description, isPublic) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const data = JSON.stringify({ name, description, public: isPublic });
  return axios({ method: 'put', url, headers, data });
}

//*********************************************************************************************************************************
/**
 * Get a Playlist Items
 * https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks/
 */
export const getPlaylistTracks = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Update Playlist Items
 * https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
 */
export const updatePlaylistItems = (playlistId, range_start, insert_before, range_length) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const data = JSON.stringify({ range_start, insert_before, range_length });
  return axios({ method: 'put', url, headers, data });
}

//*********************************************************************************************************************************
/**
 * Add Items to a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = (playlistId, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url, headers });
};

//*********************************************************************************************************************************
/**
 * Remove Playlist Items
 * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist/
 */
export const removeTracksFromPlaylist = (playlistId, tracks) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const data = JSON.stringify({ tracks });
  return axios({ method: 'delete', url, headers, data });
}

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
 * Get User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
 */
export const getUserPlaylists = (userId) =>
  axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, { 
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
 * Get Featured Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
 */
export const getFeaturedPlaylists = () =>
  axios.get('https://api.spotify.com/v1/browse/featured-playlists', { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Category's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
 */
export const getCategoryPlaylists = (categoryId) =>
  axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
    headers
  });

//*********************************************************************************************************************************
/**
 * Get Playlist Cover Image
 * https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover
 */
export const getPlaylistCoverImage = (playlistId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
    headers
  });

//*********************************************************************************************************************************
/**
 * Add Custom Playlist Cover Image
 * https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
 */
export const addCustomPlaylistCoverImage = (playlistId, image) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/images`;
  const data = JSON.stringify({ image });
  return axios({ method: 'put', url, headers, data });
};