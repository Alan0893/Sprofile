import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Episode
 * https://developer.spotify.com/documentation/web-api/reference/get-an-episode
 */
export const getEpisode = (episodeId) =>
	axios.get(`https://api.spotify.com/v1/episodes/${episodeId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Episodes
 * https://developer.spotify.com/documentation/web-api/reference/get-multiple-episodes
 */
export const getSeveralEpisodes = (ids) =>
	axios.get(`https://api.spotify.com/v1/episodes?ids=${ids}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Saved Episodes
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-episodes
 */
export const getUserSavedEpisodes = () =>
	axios.get('https://api.spotify.com/v1/me/episodes', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Save Episodes for Current User
 * https://developer.spotify.com/documentation/web-api/reference/save-episodes-user
 */
export const saveEpisodesForCurrentUser = (ids) => {
	const url = `https://api.spotify.com/v1/me/episodes?ids=${ids}`;
	return axios({ method: 'put', url, headers });
}

//*********************************************************************************************************************************
/**
 * Remove User's Saved Episodes
 * https://developer.spotify.com/documentation/web-api/reference/remove-episodes-user
 */
export const removeUsersSavedEpisodes = (ids) => {
	const url = `https://api.spotify.com/v1/me/episodes?ids=${ids}`;
	return axios({ method: 'delete', url, headers });
}

//*********************************************************************************************************************************
/**
 * Check User's Saved Episodes
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes
 */
export const checkUsersSavedEpisodes = (ids) =>	
	axios.get(`https://api.spotify.com/v1/me/episodes/contains?ids=${ids}`, { 
		headers 
	});