import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Show
 * https://developer.spotify.com/documentation/web-api/reference/get-a-show
 */
export const getShow = (showId) =>
	axios.get(`https://api.spotify.com/v1/shows/${showId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Shows
 * https://developer.spotify.com/documentation/web-api/reference/get-several-shows
 */
export const getSeveralShows = (showIds) =>
	axios.get(`https://api.spotify.com/v1/shows?ids=${showIds}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get a Show's Episodes
 * https://developer.spotify.com/documentation/web-api/reference/get-shows-episodes
 */
export const getShowEpisodes = (showId) =>
	axios.get(`https://api.spotify.com/v1/shows/${showId}/episodes`, { 
		headers
	});

//*********************************************************************************************************************************
/**
 * Get User's Saved Shows
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
 */
export const getSavedShows = () =>
	axios.get('https://api.spotify.com/v1/me/shows', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Save Shows for Current User
 * https://developer.spotify.com/documentation/web-api/reference/save-shows-user
 */
export const saveShows = (showIds) => {
	const url = `https://api.spotify.com/v1/me/shows?ids=${showIds}`;
	return axios({ method: 'put', url, headers });
}

//*********************************************************************************************************************************
/**
 * Remove User's Saved Shows
 * https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
 */
export const removeShows = (showIds) => {
	const url = `https://api.spotify.com/v1/me/shows?ids=${showIds}`;
	return axios({ method: 'delete', url, headers });
}

//*********************************************************************************************************************************
/**
 * Check User's Saved Shows
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows
 */
export const checkSavedShows = (showIds) =>	
	axios.get(`https://api.spotify.com/v1/me/shows/contains?ids=${showIds}`, {
		headers,
	});

//*********************************************************************************************************************************
export const getShowInfo = () => 
	axios
		.all([
			getShow(showId),
			getShowEpisodes(showId)
		])
		.then(
			axios.spread((
				show,
				showEpisodes
			) => ({
				show: show.data,
				showEpisodes: showEpisodes.data
			}))
		);