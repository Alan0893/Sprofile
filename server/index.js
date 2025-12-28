// Loading environment variables from the .env file into process.env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

// Getting environment variables 
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI;
let FRONTEND_URI = process.env.CLIENT_URI;
const PORT = process.env.PORT || 3000;
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

// Requiring neccessary packages
const express = require('express');
const request = require('request');
const cors = require('cors');
const crypto = require('crypto');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const axios = require('axios');

// *****************************************************************
// Creating an express app
const app = express();

// Prevent CORS errors
app.use(cors());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(cookieParser())
  .use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' },
      ],
    }),
  )
  .use(express.static(path.resolve(__dirname, '../client/build')));

// Spotify Function
const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

const stateKey = 'spotify_auth_state';

// ROUTING *****************************************************************
// Home Page
app.get('/', function (req, res) {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

// Login Page
app.get('/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = [
    'user-read-private',
    'user-top-read',
    'user-follow-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-recently-played',
    'user-follow-modify',
    // 'playlist-modify-public', // Requires Extended Quota Mode
  ].join(' ');

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: scope,
    })}`,
  );
});

// Callback - Getting Data from the api
app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.redirect(
          `${FRONTEND_URI}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

// Refreshing the access token
app.get('/refresh_token', function (req, res) {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        'base64',
      )}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({ 
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});

// TICKETMASTER *****************************************************************
app.get('/discover', async (req, res) => {
  try {
    const artist = req.query.artist;

    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`, {
        params: {
          apikey: TICKETMASTER_API_KEY,
          keyword: artist,
          classificationName: 'music',
          segmentName: 'music',
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Ticketmaster', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});