import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getPlaylist, fetchAllTracks } from '../api/playlist';
import { getAudioFeaturesForTracks } from '../api/tracks';
import { catchErrors, getPlaylistDuration } from '../utils';

import Loader from '../components/Loader';
import TrackItem from '../components/TrackItem';
import FeatureChart from '../components/FeatureChart';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const PlaylistContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: grid; /* Use CSS Grid on tablets and above */
    grid-template-columns: minmax(200px, 30%) 1fr; /* Define grid columns */
  `};
`;
const Left = styled.div`
  width: 100%; 
  text-align: center;
  min-width: 200px;
  ${media.tablet`
    width: auto; 
  `};
`;
const Right = styled.div`
  width: 100%; 
  ${media.tablet`
    width: auto;
    margin-left: 50px; 
    margin-top: 50px;
  `};
`;
const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  ${media.tablet`
    display: none;
  `};
`;
const Links = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offBlue};
  }
`;
const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;
const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;
const RecButton = styled(Link)`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
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
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;
const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;

const Playlist = props => {
  const { playlistId } = props;

  const [playlist, setPlaylist] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      const tracks = await fetchAllTracks(playlistId);
      data.tracks.items = tracks
      setPlaylist(data);
    };
    catchErrors(fetchData());
  }, [playlistId]);

  useEffect(() => {
    const fetchData = async () => {
      if (playlist) {
        const { data } = await getAudioFeaturesForTracks(playlist.tracks.items.slice(0, 100));
        setAudioFeatures(data);
      }
    };
    catchErrors(fetchData());
  }, [playlist]);

  return (
    <>
      {playlist ? (
        <Main>
          <PlaylistContainer>
            <Left>
              {playlist.images.length && (
                <PlaylistCover>
                  <img src={playlist.images[0].url} alt="Album Cover" />
                </PlaylistCover>
              )}

              <Links href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Name>{playlist.name}</Name>
              </Links>

              <Owner>By&nbsp;
                <Links href={playlist.owner.external_urls.spotify}>{playlist.owner.display_name}</Links>
              </Owner>

              {playlist.description && (
                <Description dangerouslySetInnerHTML={{ __html: playlist.description }} />
              )}

              <TotalTracks>{playlist.tracks.total} Tracks ({getPlaylistDuration(playlist)})</TotalTracks>

              <RecButton to={`/recommendations/${playlist.id}`}>Get Recommendations</RecButton>

              {audioFeatures && (
                <FeatureChart features={audioFeatures.audio_features} type="doughnut" />
              )}
            </Left>

            <Right>
              <ul>
                {playlist.tracks &&
                  playlist.tracks.items.map(({ track }, i) => <TrackItem track={track} key={i} />)}
              </ul>
            </Right>

          </PlaylistContainer>
        </Main>
      ) : (
        <Loader />
      )}
    </>
  );
};

Playlist.propTypes = {
  playlistId: PropTypes.string,
};

export default Playlist;
