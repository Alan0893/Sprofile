import styled, { keyframes } from 'styled-components';
import { theme, mixins, Main } from '../styles';
import IconSpotify from '../assets/icons/spotify';
const { colors, fontSizes } = theme;

const LOGIN_URI = process.env.REACT_APP_URL;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LoginContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(-45deg, #1a1a1a, #121212, ${colors.default}, #191414, #1a1a1a);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
    pointer-events: none;
  }
`;

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  
  svg {
    width: 80px;
    height: 80px;
    fill: ${colors.default};
    filter: drop-shadow(0 4px 20px rgba(98, 177, 246, 0.4));
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: -0.5px;
  
  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: ${fontSizes.md};
  color: ${colors.lightestGrey};
  margin-bottom: 40px;
  text-align: center;
  max-width: 400px;
  line-height: 1.5;
`;

const LoginButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: ${colors.default};
  color: ${colors.white};
  border-radius: 500px;
  padding: 16px 48px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(98, 177, 246, 0.3);

  &:hover,
  &:focus {
    background-color: ${colors.offBlue};
    transform: scale(1.04);
    box-shadow: 0 12px 40px rgba(98, 177, 246, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${colors.white};
  }
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 60px;
  max-width: 600px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.sm};
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  text-align: center;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
`;

const LoginScreen = () => (
  <LoginContainer>
    <Login>
      <LogoContainer>
        <IconSpotify />
      </LogoContainer>
      <Title>Spotify Profile</Title>
      <Subtitle>
        Discover your listening habits, top artists, favorite tracks, and get personalized recommendations.
      </Subtitle>
      <LoginButton href={LOGIN_URI}>
        <IconSpotify />
        Log in with Spotify
      </LoginButton>
      <Features>
        <Feature>Top Tracks</Feature>
        <Feature>Top Artists</Feature>
        <Feature>Audio Analysis</Feature>
        <Feature>Recommendations</Feature>
      </Features>
    </Login>
    <Footer>
      Built with the Spotify Web API
    </Footer>
  </LoginContainer>
);

export default LoginScreen;