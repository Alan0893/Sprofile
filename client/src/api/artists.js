import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export const getArtist = artistId =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { 
		headers 
	});
