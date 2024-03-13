import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks) => tracks.map(({ track }) => track.id).join(',');

//*********************************************************************************************************************************
/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export const getTrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
 */
export const getSeveralTracks = (trackIds) =>
	axios.get(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Saved Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
 */
export const getSavedTracks = () =>	
	axios.get('https://api.spotify.com/v1/me/tracks', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Save Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
 */
export const saveTracks = (trackIds) => {
	const url = `https://api.spotify.com/v1/me/tracks?ids=${trackIds}`;
	return axios({ method: 'put', url, headers });
};

//*********************************************************************************************************************************
/**
 * Remove Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
 */
export const removeTracks = (trackIds) => {
	const url = `https://api.spotify.com/v1/me/tracks?ids=${trackIds}`;
	return axios({ method: 'delete', url, headers });
}

//*********************************************************************************************************************************
/**
 * Check User's Saved Tracks
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
 */
export const checkSavedTracks = (trackIds) => 
	axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds}`, {
		headers,
	});

//*********************************************************************************************************************************
/**
 * Get Several Track's Audio Features
 * https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
 */
export const getAudioFeaturesForTracks = (tracks) => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { 
		headers 
	});
};


//*********************************************************************************************************************************
/**
 * Get Track's Audio Features
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 */
export const getAudioFeaturesForTrack = (trackId) =>
	axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Track's Audio Analysis
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export const getTrackAudioAnalysis = (trackId) =>
  axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export const getRecommendationsForTracks = (tracks) => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
  const seed_artists = '';
  const seed_genres = '';

  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
    {
      headers,
    },
  );
};

//*********************************************************************************************************************************
export const getTrackInfo = (trackId) =>
  axios
    .all([
			getTrack(trackId), 
			getTrackAudioAnalysis(trackId), 
			getAudioFeaturesForTrack(trackId)
		])
    .then(
      axios.spread((
				track, 
				audioAnalysis, 
				audioFeatures
			) => ({
        track: track.data,
        audioAnalysis: audioAnalysis.data,
        audioFeatures: audioFeatures.data,
      })),
    );