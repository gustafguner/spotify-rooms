import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { Button } from '../buttons';
import { Container, EffectMap, EffectProps } from 'constate';
import { removeToken } from '../../utils/auth';
import { getSpotifyAuthorizeUrl } from '../../utils/spotify';
import spotifyLogo from '../../assets/images/spotify-logo.svg';

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

interface State {
  loggedIn: boolean;
}

interface Effects {
  logOut: () => void;
}

const effects: EffectMap<State, Effects> = {
  logOut: () => ({ setState }: EffectProps<State>) => {
    removeToken();
    setState(() => ({
      loggedIn: false,
    }));
  },
};

const Header: React.SFC = () => (
  <Container context="auth" effects={effects}>
    {({ loggedIn, logOut }) => (
      <>
        <HeaderWrapperPadding />
        <HeaderWrapper>
          <Logo>spots</Logo>

          {loggedIn ? (
            <Button onClick={logOut}>Log out</Button>
          ) : (
            <SpotifyLoginButton onClick={getSpotifyAuthorizeUrl}>
              Log in with Spotify
              <SpotifyLogoImage src={spotifyLogo} alt="Spotify logo" />
            </SpotifyLoginButton>
          )}
        </HeaderWrapper>
      </>
    )}
  </Container>
);

export default Header;
