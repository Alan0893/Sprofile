import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Album
 * https://developer.spotify.com/documentation/web-api/reference/get-an-album
 */
export const getAlbum = (albumId) =>
	axios.get(`https://api.spotify.com/v1/albums/${albumId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Albums
 * https://developer.spotify.com/documentation/web-api/reference/get-several-albums
 */
export const getSeveralAlbums = (ids) =>
	axios.get(`https://api.spotify.com/v1/albums?ids=${ids}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Album's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-albums-tracks
 */
export const getAlbumsTracks = (albumId) =>
	axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Saved Albums
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
 */
export const getUsersSavedAlbums = () =>
	axios.get(`https://api.spotify.com/v1/me/albums`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Save Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/save-albums-user
 */
export const saveAlbumsForCurrentUser = (ids) => {
	const url = `https://api.spotify.com/v1/me/albums?ids=${ids}`;
	return axios({ method: 'put', url, headers });
}

//*********************************************************************************************************************************
/**
 * Remove User's Saved Albums
 * https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
 */
export const removeUsersSavedAlbums = (ids) => {
	const url = `https://api.spotify.com/v1/me/albums?ids=${ids}`;
	return axios({ method: 'delete', url, headers });
}

//*********************************************************************************************************************************
/**
 * Check User's Saved Albums
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
 */
export const checkUsersSavedAlbums = (ids) =>
	axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${ids}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get New Releases
 * https://developer.spotify.com/documentation/web-api/reference/get-new-releases
 */
export const getNewReleases = () =>
	axios.get('https://api.spotify.com/v1/browse/new-releases', { 
		headers 
	});