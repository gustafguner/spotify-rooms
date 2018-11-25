import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { Button } from '../buttons';
import { useContextState } from 'constate';
import { getSpotifyAuthorizeUrl } from '../../utils/spotify';
import spotifyLogo from '../../assets/images/spotify-logo.svg';
import { logOut } from 'src/utils/auth';

const HeaderWrapper = styled('header')`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.PRIMARY_DARK};
  display: flex;
  justify-content: space-between;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.08);
  padding: 0 25px;
  align-items: center;
`;

const HeaderWrapperPadding = styled('div')`
  padding-bottom: 70px;
`;

const Logo = styled('div')`
  width: 100px;
`;

const SpotifyLoginButton = styled('button')`
  background-color: ${colors.SPOTIFY_GREEN};
  color: white;
  text-decoration: none;
  padding: 10px 19px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: ${colors.SPOTIFY_GREEN_HOVERED};
  }
`;

const SpotifyLogoImage = styled('img')`
  width: 18px;
  height: 18px;
  margin-left: 7px;
`;

const isLoggedIn = () => {
  const [loggedIn, ,] = useContextState('auth');
  return loggedIn;
};

const Header: React.SFC = () => (
  <>
    <HeaderWrapperPadding />
    <HeaderWrapper>
      <Logo>spots</Logo>

      {isLoggedIn() ? (
        <Button onClick={logOut}>Log out</Button>
      ) : (
        <SpotifyLoginButton onClick={getSpotifyAuthorizeUrl}>
          Log in with Spotify
          <SpotifyLogoImage src={spotifyLogo} alt="Spotify logo" />
        </SpotifyLoginButton>
      )}
    </HeaderWrapper>
  </>
);

export default Header;
