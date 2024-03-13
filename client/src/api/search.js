import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/search
 */
export const search = (query, type) => {
	const valid = ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'];
	if (!valid.includes(type)) {
		throw new Error('Invalid type');
	}
	axios.get(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, { 
		headers 
	});
}