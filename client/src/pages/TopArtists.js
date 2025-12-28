import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../api/user';
import { catchErrors } from '../utils';

import { IconInfo } from '../assets/icons';
import Loader from '../components/Loader';
import { SkeletonCircle, SkeletonText, ArtistGridSkeleton, ArtistCardSkeleton } from '../components/SkeletonLoader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h2 {
    margin: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: -11px;
  ${media.tablet`
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin: 30px 0 0;
  `};
`;
const RangeButtons = styled.div`
  display: flex;
  ${media.tablet`
    width: 100%;
    justify-content: space-around;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${props => (props.isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid ${props => (props.isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;
const CompareButton = styled.button`
  background-color: ${props => props.isActive ? colors.default : 'transparent'};
  color: ${colors.white};
  border: 1px solid ${props => props.isActive ? colors.default : colors.lightGrey};
  border-radius: 30px;
  padding: 8px 20px;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: ${theme.transition};
  
  &:hover {
    border-color: ${colors.default};
    background-color: ${props => props.isActive ? colors.offBlue : colors.darkGrey};
  }
  
  ${media.tablet`
    width: 100%;
  `};
`;
const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const CompareContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
  
  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 40px;
  `};
`;
const CompareColumn = styled.div`
  h3 {
    color: ${colors.white};
    font-size: ${fontSizes.lg};
    margin-bottom: 20px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid ${props => props.active ? colors.default : colors.grey};
  }
`;
const CompareArtists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const CompareArtist = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${colors.darkGrey};
  transition: ${theme.transition};
  
  &:hover {
    background-color: ${colors.grey};
    transform: translateX(5px);
  }
`;
const CompareRank = styled.div`
  font-size: ${fontSizes.lg};
  font-weight: 700;
  color: ${colors.lightGrey};
  min-width: 30px;
  text-align: center;
`;
const CompareArtwork = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const CompareName = styled.div`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${colors.white};
  flex: 1;
`;
const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;
const ArtistName = styled.a`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('long');
  const [compareMode, setCompareMode] = useState(false);
  const [allRanges, setAllRanges] = useState({
    long: null,
    medium: null,
    short: null,
  });

  const apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsLong();
      setTopArtists(data);
      setAllRanges(prev => ({ ...prev, long: data }));
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async range => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
    setActiveRange(range);
    setAllRanges(prev => ({ ...prev, [range]: data }));
  };

  const setRangeData = range => catchErrors(changeRange(range));

  const toggleCompare = async () => {
    if (!compareMode) {
      // Load all time ranges if not already loaded
      const promises = [];
      if (!allRanges.long) promises.push(getTopArtistsLong());
      if (!allRanges.medium) promises.push(getTopArtistsMedium());
      if (!allRanges.short) promises.push(getTopArtistsShort());

      if (promises.length > 0) {
        const results = await Promise.all(promises);
        const newRanges = { ...allRanges };
        let idx = 0;
        if (!allRanges.long) newRanges.long = results[idx++].data;
        if (!allRanges.medium) newRanges.medium = results[idx++].data;
        if (!allRanges.short) newRanges.short = results[idx++].data;
        setAllRanges(newRanges);
      }
    }
    setCompareMode(!compareMode);
  };

  return (
    <Main>
      <Header>
        <h2>Top Artists</h2>
        <Ranges>
          <RangeButtons>
            <RangeButton isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>
              <span>All Time</span>
            </RangeButton>
            <RangeButton isActive={activeRange === 'medium'} onClick={() => setRangeData('medium')}>
              <span>Last 6 Months</span>
            </RangeButton>
            <RangeButton isActive={activeRange === 'short'} onClick={() => setRangeData('short')}>
              <span>Last 4 Weeks</span>
            </RangeButton>
          </RangeButtons>
          <CompareButton isActive={compareMode} onClick={toggleCompare}>
            {compareMode ? 'Show Single' : 'Compare All'}
          </CompareButton>
        </Ranges>
      </Header>

      {!compareMode ? (
        <ArtistsContainer>
          {topArtists ? (
            topArtists.items.map(({ id, external_urls, images, name }, i) => (
              <Artist key={i}>
                <ArtistArtwork to={`/artist/${id}`}>
                  {images.length && <img src={images[1].url} alt="Artist" />}
                  <Mask>
                    <IconInfo />
                  </Mask>
                </ArtistArtwork>
                <ArtistName href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  {name}
                </ArtistName>
              </Artist>
            ))
          ) : (
            <>
              {[...Array(20)].map((_, i) => (
                <ArtistCardSkeleton key={i}>
                  <SkeletonCircle size="200px" />
                  <SkeletonText width="150px" margin="10px 0 0" />
                </ArtistCardSkeleton>
              ))}
            </>
          )}
        </ArtistsContainer>
      ) : (
        <CompareContainer>
          {allRanges.long && (
            <CompareColumn active={activeRange === 'long'}>
              <h3>All Time</h3>
              <CompareArtists>
                {allRanges.long.items.slice(0, 10).map(({ id, images, name }, i) => (
                  <CompareArtist key={i} to={`/artist/${id}`}>
                    <CompareRank>{i + 1}</CompareRank>
                    <CompareArtwork>
                      {images.length && <img src={images[2]?.url || images[0]?.url} alt={name} />}
                    </CompareArtwork>
                    <CompareName>{name}</CompareName>
                  </CompareArtist>
                ))}
              </CompareArtists>
            </CompareColumn>
          )}
          {allRanges.medium && (
            <CompareColumn active={activeRange === 'medium'}>
              <h3>Last 6 Months</h3>
              <CompareArtists>
                {allRanges.medium.items.slice(0, 10).map(({ id, images, name }, i) => (
                  <CompareArtist key={i} to={`/artist/${id}`}>
                    <CompareRank>{i + 1}</CompareRank>
                    <CompareArtwork>
                      {images.length && <img src={images[2]?.url || images[0]?.url} alt={name} />}
                    </CompareArtwork>
                    <CompareName>{name}</CompareName>
                  </CompareArtist>
                ))}
              </CompareArtists>
            </CompareColumn>
          )}
          {allRanges.short && (
            <CompareColumn active={activeRange === 'short'}>
              <h3>Last 4 Weeks</h3>
              <CompareArtists>
                {allRanges.short.items.slice(0, 10).map(({ id, images, name }, i) => (
                  <CompareArtist key={i} to={`/artist/${id}`}>
                    <CompareRank>{i + 1}</CompareRank>
                    <CompareArtwork>
                      {images.length && <img src={images[2]?.url || images[0]?.url} alt={name} />}
                    </CompareArtwork>
                    <CompareName>{name}</CompareName>
                  </CompareArtist>
                ))}
              </CompareArtists>
            </CompareColumn>
          )}
          {(!allRanges.long || !allRanges.medium || !allRanges.short) && <Loader />}
        </CompareContainer>
      )}
    </Main>
  );
};

export default TopArtists;
