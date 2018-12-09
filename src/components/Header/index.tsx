import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { Button } from '../buttons';
import { getSpotifyAuthorizeUrl } from '../../utils/spotify';
import spotifyLogo from '../../assets/images/spotify-logo.svg';
import { clear } from 'src/utils/auth';
import { useContextState } from 'constate';
import { Link } from 'react-router-dom';

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
});

const HeaderWrapperPadding = styled('div')({
  paddingBottom: 70,
});

const Logo = styled('div')({
  width: 100,
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
  const [auth, setAuth] = useContextState('auth');
  const [visitingRoom] = useContextState('visitingRoom');
  const logOut = () => {
    clear();
    setAuth({
      ...auth,
      loggedIn: false,
    });
  };
  return (
    <>
      <HeaderWrapperPadding />
      <HeaderWrapper>
        <Link to="/">
          <Logo>spotify-rooms</Logo>
        </Link>

        {visitingRoom && visitingRoom !== null ? (
          <h4>{visitingRoom.name}</h4>
        ) : (
          <h4>Enter a room...</h4>
        )}

        {auth && auth.loggedIn ? (
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
