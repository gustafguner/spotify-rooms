import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import { getSpotifyAuthorizeUrl } from 'src/utils/spotify';
import spotifyLogo from 'src/assets/images/spotify-logo.svg';
import { clear } from 'src/utils/auth';
import { Link } from 'react-router-dom';

import logo from 'src/assets/images/logo.svg';
import { Root } from 'src/Root';
import { Room } from 'src/features/room';
import { PlaybackContainer } from '../Playback';

const HeaderWrapper = styled('header')({
  width: '100%',
  height: 70,
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: colors.PRIMARY_DARK,
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0 3px 7px rgba(0, 0, 0, 0.08)',
  paddingLeft: 25,
  paddingRight: 25,
  alignItems: 'center',
  zIndex: 1,
});

const HeaderWrapperPadding = styled('div')({
  paddingBottom: 70,
});

const LogoContainer = styled('div')({
  width: 160,
  display: 'flex',
});

const Logo = styled('img')({
  width: '100%',
});

const SpotifyLoginButton = styled('button')({
  backgroundColor: colors.SPOTIFY_GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 19,
  paddingRight: 19,
  borderRadius: 100,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colors.SPOTIFY_GREEN_HOVERED,
  },
});

const SpotifyLogoImage = styled('img')({
  width: 18,
  height: 18,
  marginLeft: 7,
});

const Header: React.SFC = () => {
  const { root, setRoot }: any = React.useContext(Root.Context);

  const logOut = () => {};
  return (
    <>
      <HeaderWrapperPadding />
      <HeaderWrapper>
        <Link to="/">
          <LogoContainer>
            <Logo src={logo} />
          </LogoContainer>
        </Link>

        {root.visitingRoom && root.visitingRoom !== null ? (
          <h4>{root.visitingRoom.name}</h4>
        ) : (
          <h4>Enter a room...</h4>
        )}

        {root.auth && root.auth.loggedIn ? (
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
};

export default Header;
