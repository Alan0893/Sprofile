# Spotify Profile

A React application that displays your Spotify profile, top artists, top tracks, playlists, and recently played music. Also integrates with Ticketmaster API to show upcoming concerts for your favorite artists.

- Utilizes the [Spotify](https://developer.spotify.com/documentation/web-api) API to obtain User, Artists, Album, Playlist, Tracks, and Player information.
- Utilizes the [TicketMaster](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) API to get an Artist's upcoming events.

## Prerequisites

- Node.js and npm installed
- Spotify Developer Account
- Ticketmaster API Key (optional, for concert features)

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:Alan0893/spotify-profile.git
cd spotify-profile
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://127.0.0.1:8888/callback
CLIENT_URI=http://127.0.0.1:8888
PORT=8888
TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

**Important Notes:**

- The `REDIRECT_URI` must use `127.0.0.1` (loopback IP) instead of `localhost` - this is required by Spotify's new HTTP redirect policy
- Make sure the port matches between `REDIRECT_URI`, `CLIENT_URI`, and `PORT`

### 3. Spotify Developer Dashboard Configuration

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app or select your existing app
3. In the app settings, add the following Redirect URI:
   - `http://127.0.0.1:8888/callback`
4. Save your Client ID and Client Secret to the `.env` file

**Note:** If your app is in Development Mode, you'll need to add your Spotify account email to the app's users list in the dashboard.

### 4. Install Dependencies

Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 5. Build the Client

Since the backend serves the built React app, you need to build it first:

```bash
cd client
npm run build
```

## Usage

### Start the Server

The server serves both the API endpoints and the built React client:

```bash
cd server
node index
```

The application will be available at `http://127.0.0.1:8888`

### Development Workflow

When making changes to the client code:

1. Make your changes in `client/src/`
2. Rebuild the client:
   ```bash
   cd client
   npm run build
   ```
3. Restart the server to serve the updated build

## API Scopes

The application uses the following Spotify API scopes:

- `user-read-private` - Read user profile information
- `user-top-read` - Read user's top artists and tracks
- `user-follow-read` - Read user's followed artists
- `user-follow-modify` - Follow/unfollow artists
- `playlist-read-private` - Read user's private playlists
- `playlist-read-collaborative` - Read collaborative playlists
- `user-read-recently-played` - Read user's recently played tracks

**Note:** Playlist creation/modification requires Extended Quota Mode approval from Spotify.

## Features

- View your Spotify profile with follower count
- Browse your top artists and tracks (all time)
- View your playlists
- See recently played tracks
- Get track recommendations
- Discover upcoming concerts for artists via Ticketmaster
- View detailed information about tracks, artists, and albums

## Images

Sample images of each page are available in the `images/` directory:

- `User`, `Artist`, `Playlists`, `Recent`, `Tracks`, `Recommendations`
- `Artist:id`, `Playlist:id`, `Album:id`, `Track:id`
