import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../api/search';
import { catchErrors } from '../utils';
import Loader from '../components/Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const SearchContainer = styled(Main)`
  padding: ${spacing.xl};
`;

const SearchInputWrapper = styled.div`
  ${mixins.flexCenter};
  margin-bottom: ${spacing.xl};
`;

const SearchInput = styled.input`
  background-color: ${colors.darkGrey};
  color: ${colors.white};
  border: 2px solid transparent;
  border-radius: 50px;
  padding: 16px 24px;
  font-size: ${fontSizes.md};
  width: 100%;
  max-width: 600px;
  transition: ${theme.transition};
  
  &:focus {
    outline: none;
    border-color: ${colors.default};
    background-color: ${colors.black};
  }
  
  &::placeholder {
    color: ${colors.lightGrey};
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: ${spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${props => props.active ? colors.default : 'transparent'};
  color: ${colors.white};
  border: 2px solid ${props => props.active ? colors.default : colors.lightGrey};
  border-radius: 50px;
  padding: 10px 24px;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: ${theme.transition};
  
  &:hover {
    border-color: ${colors.default};
    background: ${props => props.active ? colors.offBlue : colors.darkGrey};
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${spacing.lg};
  margin-top: ${spacing.lg};
  
  ${media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: ${spacing.md};
  `};
`;

const ResultItem = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: ${theme.transition};
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ResultImage = styled.div`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: ${spacing.sm};
  background-color: ${colors.darkGrey};
  border-radius: ${props => props.type === 'artist' ? '100%' : '4px'};
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderImage = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.darkGrey};
  color: ${colors.lightGrey};
  font-size: 48px;
`;

const ResultName = styled.div`
  font-weight: 700;
  font-size: ${fontSizes.md};
  margin-bottom: ${spacing.xs};
  color: ${colors.white};
`;

const ResultInfo = styled.div`
  font-size: ${fontSizes.xs};
  color: ${colors.lightGrey};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EmptyState = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 300px;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.lg};
  text-align: center;
  
  svg {
    width: 80px;
    height: 80px;
    margin-bottom: ${spacing.md};
    opacity: 0.3;
  }
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('track');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setHasSearched(false);
      return;
    }

    const delaySearch = setTimeout(() => {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const { data } = await search(query, activeTab);
          setResults(data);
          setHasSearched(true);
        } catch (error) {
          console.error('Search error:', error);
        }
        setLoading(false);
      };
      catchErrors(fetchResults());
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, activeTab]);

  const getResultsData = () => {
    if (!results) return [];
    
    switch (activeTab) {
      case 'artist':
        return results.artists?.items || [];
      case 'album':
        return results.albums?.items || [];
      case 'track':
        return results.tracks?.items || [];
      case 'playlist':
        return results.playlists?.items || [];
      default:
        return [];
    }
  };

  const getResultLink = (item) => {
    switch (activeTab) {
      case 'artist':
        return `/artist/${item.id}`;
      case 'album':
        return `/album/${item.id}`;
      case 'track':
        return `/track/${item.id}`;
      case 'playlist':
        return `/playlists/${item.id}`;
      default:
        return '#';
    }
  };

  const getResultImage = (item) => {
    if (activeTab === 'track') {
      return item.album?.images?.[0]?.url;
    }
    return item.images?.[0]?.url;
  };

  const getResultSubtext = (item) => {
    switch (activeTab) {
      case 'artist':
        return 'Artist';
      case 'album':
        return item.artists?.[0]?.name || 'Album';
      case 'track':
        return item.artists?.map(artist => artist.name).join(', ') || 'Track';
      case 'playlist':
        return `${item.tracks?.total || 0} tracks`;
      default:
        return '';
    }
  };

  const resultsData = getResultsData();

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search for artists, albums, tracks, or playlists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </SearchInputWrapper>

      <TabContainer>
        <Tab active={activeTab === 'track'} onClick={() => setActiveTab('track')}>
          Tracks
        </Tab>
        <Tab active={activeTab === 'artist'} onClick={() => setActiveTab('artist')}>
          Artists
        </Tab>
        <Tab active={activeTab === 'album'} onClick={() => setActiveTab('album')}>
          Albums
        </Tab>
        <Tab active={activeTab === 'playlist'} onClick={() => setActiveTab('playlist')}>
          Playlists
        </Tab>
      </TabContainer>

      {loading && <Loader />}

      {!loading && hasSearched && resultsData.length === 0 && (
        <EmptyState>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <div>No results found</div>
        </EmptyState>
      )}

      {!loading && !hasSearched && (
        <EmptyState>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <div>Start typing to search</div>
        </EmptyState>
      )}

      {!loading && resultsData.length > 0 && (
        <ResultsContainer>
          {resultsData.map((item) => (
            <ResultItem key={item.id} to={getResultLink(item)}>
              <ResultImage type={activeTab}>
                {getResultImage(item) ? (
                  <img src={getResultImage(item)} alt={item.name} />
                ) : (
                  <PlaceholderImage>♫</PlaceholderImage>
                )}
              </ResultImage>
              <ResultName>{item.name}</ResultName>
              <ResultInfo>{getResultSubtext(item)}</ResultInfo>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

export default Search;
