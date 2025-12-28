import React, { useState, useEffect } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../api/user';
import { catchErrors } from '../utils';

import Loader from '../components/Loader';
import TrackItem from '../components/TrackItem';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes } = theme;

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
const TracksContainer = styled.ul`
  margin-top: 50px;
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
const CompareTracks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('long');
  const [compareMode, setCompareMode] = useState(false);
  const [allRanges, setAllRanges] = useState({
    long: null,
    medium: null,
    short: null,
  });

  const apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTracksLong();
      setTopTracks(data);
      setAllRanges(prev => ({ ...prev, long: data }));
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async range => {
    const { data } = await apiCalls[range];
    setTopTracks(data);
    setActiveRange(range);
    setAllRanges(prev => ({ ...prev, [range]: data }));
  };

  const setRangeData = range => catchErrors(changeRange(range));

  const toggleCompare = async () => {
    if (!compareMode) {
      const promises = [];
      if (!allRanges.long) promises.push(getTopTracksLong());
      if (!allRanges.medium) promises.push(getTopTracksMedium());
      if (!allRanges.short) promises.push(getTopTracksShort());

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
        <h2>Top Tracks</h2>
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
        <TracksContainer>
          {topTracks ? (
            topTracks.items.map((track, i) => <TrackItem track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </TracksContainer>
      ) : (
        <CompareContainer>
          {allRanges.long && (
            <CompareColumn active={activeRange === 'long'}>
              <h3>All Time</h3>
              <CompareTracks>
                {allRanges.long.items.slice(0, 10).map((track, i) => (
                  <TrackItem track={track} key={i} />
                ))}
              </CompareTracks>
            </CompareColumn>
          )}
          {allRanges.medium && (
            <CompareColumn active={activeRange === 'medium'}>
              <h3>Last 6 Months</h3>
              <CompareTracks>
                {allRanges.medium.items.slice(0, 10).map((track, i) => (
                  <TrackItem track={track} key={i} />
                ))}
              </CompareTracks>
            </CompareColumn>
          )}
          {allRanges.short && (
            <CompareColumn active={activeRange === 'short'}>
              <h3>Last 4 Weeks</h3>
              <CompareTracks>
                {allRanges.short.items.slice(0, 10).map((track, i) => (
                  <TrackItem track={track} key={i} />
                ))}
              </CompareTracks>
            </CompareColumn>
          )}
          {(!allRanges.long || !allRanges.medium || !allRanges.short) && <Loader />}
        </CompareContainer>
      )}
    </Main>
  );
};

export default TopTracks;
