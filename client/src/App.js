// App.js
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { token } from './api';

import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';

import styled from 'styled-components';
import { GlobalStyle } from './styles';

const AppContainer = styled.div`
	height: 100%;
	min-height: 100vh;
`;

const App = () => {
	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		setAccessToken(token);
	}, []);

	return (
		<AppContainer>
			<GlobalStyle />
			<BrowserRouter>
				{!accessToken ? <LoginScreen /> : <Profile />}
			</BrowserRouter>
		</AppContainer>
	)
}

export default App;
