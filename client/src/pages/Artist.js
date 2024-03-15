import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatWithCommas, catchErrors } from '../utils';
import { getArtist, getArtistsAlbums } from '../api/artists';
import { IconMusic } from '../assets/icons';

import Loader from '../components/Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;
const ArtistName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offBlue};
  }
`;
const Name = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};
  ${media.tablet`
    font-size: 7vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;
const Stat = styled.div`
`;
const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;
const Genre = styled.div`
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;


const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  margin-left: ${spacing.lg};
  margin-right: ${spacing.lg};
`;
const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 2fr));
  grid-gap: ${spacing.md};
  width: 100%;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 2fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
  `};
`;
const Album = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const AlbumMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const AlbumImage = styled.img`
  object-fit: cover;
`;
const AlbumCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${AlbumMask} {
      opacity: 1;
    }
  }
`;
const PlaceholderArtwork = styled.div`
  ${mixins.flexCenter};
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: ${colors.darkGrey};
  svg {
    width: 50px;
    height: 50px;
  }
`;
const PlaceholderContent = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const AlbumName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

const Artist = props => {
  const { artistId } = props;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtist(artistId);
      setArtist(data);
    };
    catchErrors(fetchData());
  }, [artistId]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtistsAlbums(artistId);
      setAlbums(data);
    };
    catchErrors(fetchData());
  }, [artistId]);

  return (
    <>
      { artist ? (
        <>
          <ArtistContainer>
            <Artwork>
              <img src={artist.images[0].url} alt="Artist" />
            </Artwork>

            <div>
              <ArtistName href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Name>{artist.name}</Name>
              </ArtistName>

              <Stats>
                <Stat>
                  <Number>{formatWithCommas(artist.followers.total)}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>

                {artist.genres && (
                  <Stat>
                    <Number>
                      { artist.genres.map(genre => (
                        <Genre key={genre}>{genre}</Genre>
                      ))}
                    </Number>
                    <NumLabel>Genres</NumLabel>
                  </Stat>
                )}
                {artist.popularity && (
                  <Stat>
                    <Number>{ artist.popularity }%</Number>
                    <NumLabel>Popularity</NumLabel>
                  </Stat>
                )}
              </Stats>
            </div>
          </ArtistContainer>
          <Wrapper>
            <AlbumContainer>
              {albums ? (
                albums.items.map(({ id, images, name, total_tracks }, i) => (
                  <Album key={i}>

                    <AlbumCover to={`/album/${id}`}>
                      {images.length ? (
                        <AlbumImage src={images[0].url} alt="Album Cover" />
                      ) : (
                        <PlaceholderArtwork>
                          <PlaceholderContent>
                            <IconMusic />
                          </PlaceholderContent>
                        </PlaceholderArtwork>
                      )}
                      <AlbumMask>
                        <i className="fas fa-info-circle" />
                      </AlbumMask>
                    </AlbumCover>

                    <div>
                      <AlbumName to={`/album/${id}`}>{name}</AlbumName>
                      <TotalTracks>{total_tracks} Tracks</TotalTracks>
                    </div>
                  </Album>
                ))
              ) : (
                <Loader />
              )}
              
            </AlbumContainer>
          </Wrapper>
        </>
      ) : (
        <Loader />
      ) }
    </>
  );
};

Artist.propTypes = {
  artistId: PropTypes.string,
};

export default Artist;
