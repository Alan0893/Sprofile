import { Route, Routes, useParams } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Nav from './Nav';
import User from './User';
import RecentlyPlayed from './RecentlyPlayed';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Recommendations from './Recommendations';
import Track from './Track';
import Artist from './Artist';

import styled from 'styled-components';
import { theme, media } from '../styles';

const SiteWrapper = styled.div`
	padding-left: ${theme.navWidth};
	${media.tablet`
		padding-left: 0;
		padding-bottom: 50px;
	`};
`;

const Profile = () => (
	<SiteWrapper>
		<Nav/>
			<ScrollToTop/>
			<Routes>
				<Route exact path="/" element={<User/>} />
				<Route path="/recent" element={<RecentlyPlayed/>} />
				<Route path="/artists" element={<TopArtists/>} />
				<Route path="/tracks" element={<TopTracks/>} />
				<Route path="/playlists" element={<Playlists/>} />
				<Route path="/playlist/:id" element={<PlaylistId/>} />
				<Route path="/recommendations/:id" element={<RecommendationsId/>} />
				<Route path="/track/:id" element={<TrackId/>} />
				<Route path="/artist/:id" element={<ArtistId/>} />
			</Routes>
	</SiteWrapper>
);

const PlaylistId = () => {
	const { id } = useParams();
	return <Playlist playlistId={id} />;
}
const RecommendationsId = () => {
	const { id } = useParams();
	return <Recommendations playlistId={id} />;
}
const TrackId = () => {
	const { id } = useParams();
	return <Track trackId={id} />;
}
const ArtistId = () => {
	const { id } = useParams();
	return <Artist artistId={id} />;
}

export default Profile;