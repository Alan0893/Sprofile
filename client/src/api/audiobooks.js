import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get an Audiobook
 * https://developer.spotify.com/documentation/web-api/reference/get-an-audiobook
 */
export const getAudiobook = (audiobookId) =>
	axios.get(`https://api.spotify.com/v1/audiobooks/${audiobookId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Audiobooks
 * https://developer.spotify.com/documentation/web-api/reference/get-several-audiobooks
 */
export const getSeveralAudiobooks = (ids) =>
	axios.get(`https://api.spotify.com/v1/audiobooks?ids=${ids}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Audiobook's Chapters
 * https://developer.spotify.com/documentation/web-api/reference/get-an-audiobooks-chapters
 */
export const getAudiobooksChapters = (audiobookId) =>
	axios.get(`https://api.spotify.com/v1/audiobooks/${audiobookId}/chapters`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Saved Audiobooks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-audiobooks
 */
export const getUsersSavedAudiobooks = () =>
	axios.get(`https://api.spotify.com/v1/me/audiobooks`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Save Audiobook for Current User
 * https://developer.spotify.com/documentation/web-api/reference/save-audiobooks
 */
export const saveAudiobooks = (ids) => {
	const url = `https://api.spotify.com/v1/me/audiobooks?ids=${ids}`;
	return axios({ method: 'put', url, headers });
}

//*********************************************************************************************************************************
/**
 * Remove User's Saved Audiobooks
 * https://developer.spotify.com/documentation/web-api/reference/remove-audiobooks
 */
export const removeUsersSavedAudiobooks = (ids) => {
	const url = `https://api.spotify.com/v1/me/audiobooks?ids=${ids}`;
	return axios({ method: 'delete', url, headers });
}

//*********************************************************************************************************************************
/**
 * Check User's Saved Audiobooks
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-audiobooks
 */
export const checkUsersSavedAudiobooks = (ids) => 
	axios.get(`https://api.spotify.com/v1/me/audiobooks/contains?ids=${ids}`, { 
		headers 
	});