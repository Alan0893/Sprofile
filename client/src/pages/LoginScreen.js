import styled from 'styled-components';
import { theme, mixins, Main } from '../styles';
const { colors, fontSizes } = theme;

const LOGIN_URI = 'https://sprofile-backend.onrender.com/login';

const LoginContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: #212121;
  background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a2d3816-66fc-444a-b22a-81f3a67838af/deo182h-4d8f64bf-0b0c-4f9b-8d13-a57c8d144ce1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdhMmQzODE2LTY2ZmMtNDQ0YS1iMjJhLTgxZjNhNjc4MzhhZlwvZGVvMTgyaC00ZDhmNjRiZi0wYjBjLTRmOWItOGQxMy1hNTdjOGQxNDRjZTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kplGovV3iIhR_A57G9pi3PocT73O4TNsf07CUHPoPAk');
  background-size: cover; 
  background-repeat: no-repeat;
`;
const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.default};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offBlue};
  }
`;

const LoginScreen = () => (
  <LoginContainer>
    <Login>
      <h1>Spotify Profile</h1>
      <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
    </Login>
  </LoginContainer>
);

export default LoginScreen;