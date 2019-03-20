import * as React from 'react';
import styled from 'styled-components';
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

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.PRIMARY_GRAY};
  display: flex;
  justify-content: space-between;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.08);
  padding-left: 25px;
  padding-right: 25px;
  align-items: center;
  z-index: 1;
`;

const HeaderWrapperPadding = styled.div`
  padding-bottom: 70px;
`;

const LogoContainer = styled.div`
  width: 160x;
  display: flex;
`;

const Logo = styled.img`
  width: 100%;
`;

const SpotifyLoginButton = styled.button`
  background-color: ${colors.GREEN};
  color: ${colors.WHITE};
  text-decoration: none;
  padding: 10px 19px 10px 10px;
  border-radius: 100px;
  display: flex;
  alignitems: center;
  position: relative;
  font-size: 16px;
  border: none;
  cursor: pointer;
  ':hover': {
    background-color: ${colors.GREEN};
  }
`;

const SpotifyLogoImage = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 7px;
`;

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
