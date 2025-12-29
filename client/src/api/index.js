import axios from 'axios';
import { getHashParams } from '../utils';

// Backend URL - use environment variable in production, fallback to localhost in dev
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8888';

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000;	// 1 hour

// Setting tokens to local storage
const setTokenTimestamp = () => window.localStorage.setItem('token_timestamp', Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('access_token', token);
};
const setLocalRefreshToken = (token) => window.localStorage.setItem('refresh_token', token);

// Getting tokens from local storage
const getTokenTimestamp = () => window.localStorage.getItem('token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token, refresh_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // Token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('token_timestamp');
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.location.reload();
};