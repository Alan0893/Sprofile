import React, { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../api/player';
import { catchErrors } from '../utils';

import Loader from '../components/Loader';
import TrackItem from '../components/TrackItem';

import styled from 'styled-components';
import { Main } from '../styles';

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
        ) : (
          <Loader />
        )}
      </TracksContainer>
    </Main>
  );
};

export default RecentlyPlayed;
