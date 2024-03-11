import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import User from './User';

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
		<Router>
			<Switch>
				<Route exact path="/" component={User} />
			</Switch>
		</Router>
	</SiteWrapper>
)

export default Profile;