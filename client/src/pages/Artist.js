import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { formatWithCommas, catchErrors } from '../utils';
import { getArtist } from '../api/artists';

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

const Artist = props => {
  const { artistId } = props;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtist(artistId);
      setArtist(data);
    };
    catchErrors(fetchData());
  }, [artistId]);

  return (
    <>
      { artist ? (
        <ArtistContainer>
          <Artwork>
            <img src={artist.images[0].url} alt="Artist Image" />
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
