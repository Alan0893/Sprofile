import { token } from "./index";
import axios from "axios";
import { getPlaylists } from "./playlist";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export const getUser = () => 
	axios.get('https://api.spotify.com/v1/me', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { 
		headers 
	});

/**
 * Get User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { 
		headers 
	});
export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/get-users-profile
 */
export const getUserProfile = (userId) => 
	axios.get(`https://api.spotify.com/v1/users/${userId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Follow Playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow-playlist
 */
export const followPlaylist = (playlistId) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  return axios({ method: 'put', url, headers });
};

//*********************************************************************************************************************************
/**
 * Unfollow Playlist
 * https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
 */
export const unfollowPlaylist = (playlistId) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  return axios({ method: 'delete', url, headers });
};

//*********************************************************************************************************************************
/**
 * Get Followed Artists
 * https://developer.spotify.com/documentation/web-api/reference/get-followed
 */
export const getFollowed = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Follow Artists
 * https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
 */
export const followArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: 'put', url, headers });
};

/**
 * Follow Users
 * https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
 */
export const followUser = (userId) => {
  const url = `https://api.spotify.com/v1/me/following?type=user&ids=${userId}`;
  return axios({ method: 'put', url, headers });
};

//*********************************************************************************************************************************
/**
 * Unfollow Users
 * https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
 */
export const unfollowArtist = (artistId) => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: 'delete', url, headers });
};

/**
 * Unfollow Users
 * https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
 */
export const unfollowUser = (userId) => {
  const url = `https://api.spotify.com/v1/me/following?type=user&ids=${userId}`;
  return axios({ method: 'delete', url, headers });
};

//*********************************************************************************************************************************
/**
 * Check if Current User Follows Artists
 * https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
 */
export const doesUserFollowArtist = (artistId) =>
  axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
    headers,
  });

/**
 * Check if Current User Follows Users
 * https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
 */
export const doesUserFollowUser = (userId) =>
  axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${userId}`, {
    headers,
  });

//*********************************************************************************************************************************
/**
 * Check if Users Follow a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
 */
export const doesUserFollowPlaylist = (playlistId, userId) =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`, {
    headers,
  });

//*********************************************************************************************************************************
export const getUserInfo = () =>
axios
  .all([
		getUser(), 
		getFollowed(), 
		getPlaylists(), 
		getTopArtistsLong(), 
		getTopTracksLong()
	])
  .then(
    axios.spread((
			user, 
			followedArtists, 
			playlists, 
			topArtists, 
			topTracks
		) => ({
      user: user.data,
      followedArtists: followedArtists.data,
      playlists: playlists.data,
      topArtists: topArtists.data,
      topTracks: topTracks.data,
    })),
  );