import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

/**
 * Get Artist
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export const getArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-several-artists
 */
export const getSeveralArtists = (ids) =>
  axios.get(`https://api.spotify.com/v1/artists?ids=${ids}`, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Artist's Albums
 * https://developer.spotify.com/documentation/web-api/reference/get-artists-albums
 */
export const getArtistsAlbums = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Artist's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-artists-top-tracks
 */
export const getArtistsTopTracks = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-trackS`, { 
    headers 
  });

//*********************************************************************************************************************************
/**
 * Get Artist's Related Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-related-artists
 */
export const getArtistsRelatedArtists = (artistId) =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, { 
    headers 
  });