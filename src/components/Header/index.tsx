import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

import spotifyLogo from 'src/assets/images/spotify-logo.svg';

const HeaderWrapper = styled('header')`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.WHITE};
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

const SpotifyLoginButton = styled('a')`
  background-color: ${colors.SPOTIFY_GREEN};
  color: white;
  text-decoration: none;
  padding: 10px 19px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background-color: ${colors.SPOTIFY_GREEN_HOVERED};
  }
`;

const SpotifyLogoImage = styled('img')`
  width: 18px;
  height: 18px;
  margin-left: 10px;
`;

const Header = () => (
  <>
    <HeaderWrapperPadding />
    <HeaderWrapper>
      <Logo>spots</Logo>
      <SpotifyLoginButton href="http://localhost:8888/login">
        Log in
        <SpotifyLogoImage src={spotifyLogo} alt="Spotify logo" />
      </SpotifyLoginButton>
    </HeaderWrapper>
  </>
);

export default Header;
