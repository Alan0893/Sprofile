import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
  getPlaylist,
  createPlaylist,
  addTracksToPlaylist
} from '../api/playlist';
import { 
  getUser,
  followPlaylist,
  doesUserFollowPlaylist
} from '../api/user';
import {
  getRecommendationsForTracks
} from '../api/tracks';

import { catchErrors } from '../utils';

import TrackItem from '../components/TrackItem';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const PlaylistHeading = styled.div`
  ${mixins.flexBetween};
  ${media.tablet`
    flex-direction: column;

  `};
  h2 {
    margin-bottom: 0;
  }
`;
const SaveButton = styled.button`
  background-color: transparent;
  color: ${colors.blue};
  border: 1px solid ${colors.blue};
  border-radius: 30px;
  margin-top: 30px;
  margin-bottom: ${spacing.lg};
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.blue};
    color: ${colors.black};
  }
`;
const OpenButton = styled.a`
  background-color: transparent;
  color: ${colors.blue};
  border: 1px solid ${colors.blue};
  border-radius: 30px;
  margin-top: 30px;
  margin-bottom: ${spacing.lg};
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.blue};
    color: ${colors.black};
  }
`;
const TracksContainer = styled.ul`
  margin-top: 50px;
`;
const PlaylistLink = styled(Link)`
  &:hover,
  &:focus {
    color: ${colors.offBlue};
  }
`;

const Recommendations = props => {
  const { playlistId } = props;

  const [playlist, setPlaylist] = useState(null);
  const [recommendations, setRecommmendations] = useState(null);
  const [recPlaylistId, setRecPlaylistId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    catchErrors(fetchPlaylistData());

    const fetchUserData = async () => {
      const { data } = await getUser();
      setUserId(data.id);
    };
    catchErrors(fetchUserData());
  }, [playlistId]);

  useMemo(() => {
    const fetchData = async () => {
      if (playlist) {
        const { data } = await getRecommendationsForTracks(playlist.tracks.items);
        setRecommmendations(data);
      }
    };
    catchErrors(fetchData());
  }, [playlist]);

  // If recPlaylistId has been set, add tracks to playlist and follow
  useMemo(() => {
    const isUserFollowingPlaylist = async plistId => {
      const { data } = await doesUserFollowPlaylist(plistId, userId);
      setIsFollowing(data[0]);
    };

    const addTracksAndFollow = async () => {
      const uris = recommendations.tracks.map(({ uri }) => uri).join(',');
      const { data } = await addTracksToPlaylist(recPlaylistId, uris);

      // Then follow playlist
      if (data) {
        await followPlaylist(recPlaylistId);
        // Check if user is following so we can change the save to spotify button to open on spotify
        catchErrors(isUserFollowingPlaylist(recPlaylistId));
      }
    };

    if (recPlaylistId && recommendations && userId) {
      catchErrors(addTracksAndFollow(recPlaylistId));
    }
  }, [recPlaylistId, recommendations, userId]);

  const createPlaylistOnSave = async () => {
    if (!userId) {
      return;
    }

    const name = `Recommended Tracks Based on ${playlist.name}`;
    const { data } = await createPlaylist(userId, name);
    setRecPlaylistId(data.id);
  };

  return (
    <Main>
      {playlist && (
        <PlaylistHeading>
          <h2>
            Recommended Tracks Based On{' '}
            <PlaylistLink to={`/playlists/${playlist.id}`}>{playlist.name}</PlaylistLink>
          </h2>
          {isFollowing && recPlaylistId ? (
            <OpenButton
              href={`https://open.spotify.com/playlist/${recPlaylistId}`}
              target="_blank"
              rel="noopener noreferrer">
              Open in Spotify
            </OpenButton>
          ) : (
            <SaveButton onClick={catchErrors(createPlaylistOnSave)}>Save to Spotify</SaveButton>
          )}
        </PlaylistHeading>
      )}
      <TracksContainer>
        {recommendations &&
          recommendations.tracks.map((track, i) => <TrackItem track={track} key={i} />)}
      </TracksContainer>
    </Main>
  );
};

Recommendations.propTypes = {
  playlistId: PropTypes.string,
};

export default Recommendations;
