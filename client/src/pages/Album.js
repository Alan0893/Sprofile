import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAlbum } from '../api/album';
import { getAudioFeaturesForTracks } from '../api/tracks';
import { catchErrors, getAlbumDuration } from '../utils';

import Loader from '../components/Loader';
import AlbumItem from '../components/AlbumItem';
import FeatureChart from '../components/FeatureChart';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const AlbumContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: block;
  `};
`;
const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
  ${media.tablet`
    width: 100%;
    min-width: auto;
  `};
`;
const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
  ${media.tablet`
    margin: 50px 0 0;
  `};
`;
const AlbumCover = styled.div`
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
const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;
const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;

const Album = props => {
  const { albumId } = props;

  const [album, setAlbum] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAlbum(albumId);
      setAlbum(data);
    };
    catchErrors(fetchData());
  }, [albumId]);

  useEffect(() => {
    const fetchData = async () => {
      if (album) {
        const { data } = await getAudioFeaturesForTracks(album.tracks.items);
        setAudioFeatures(data);
      }
    };
    catchErrors(fetchData());
  }, [album]);

  return (
    <>
      {album ? (
        <Main>
          <AlbumContainer>
            <Left>
              {album.images.length && (
                <AlbumCover>
                  <img src={album.images[0].url} alt="Album Cover" />
                </AlbumCover>
              )}

              <Links href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Name>{album.name}</Name>
              </Links>

              <Owner>By&nbsp;
                <Links href={album.artists[0].external_urls.spotify}>{album.artists[0].name}</Links>
              </Owner>

              {album.description && (
                <Description dangerouslySetInnerHTML={{ __html: album.label }} />
              )}

              <TotalTracks>{album.tracks.total} Tracks</TotalTracks>
              
              <br/>
              <br/>
              {audioFeatures && (
                <FeatureChart features={audioFeatures.audio_features} type="doughnut" />
              )}
            </Left>

            <Right>
              <ul>
                {album.tracks &&
                  album.tracks.items.map((track, i) => <AlbumItem track={track} key={i} images={album.images} name={album.name}/>)}
              </ul>
            </Right>

          </AlbumContainer>
        </Main>
      ) : (
        <Loader />
      )}
    </>
  );
};

Album.propTypes = {
  albumId: PropTypes.string,
};

export default Album;
