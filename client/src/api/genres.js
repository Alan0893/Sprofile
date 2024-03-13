import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Available Genre Seeds
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
 */
export const getAvailableGenreSeeds = () =>
	axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', { 
		headers 
	});