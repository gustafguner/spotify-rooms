import * as React from 'react';
import styled from 'react-emotion';

const HeaderWrapper = styled('header')`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.08);
  padding: 0 25px;
  align-items: center;
`;

const HeaderWrapperPadding = styled('div')`
  padding-bottom: 70px;
`;

const Logo = styled('div')`
  width: 100px;
  height: 30px;
  background-color: red;
`;

const Header: React.SFC<{}> = () => (
  <>
    <HeaderWrapperPadding />
    <HeaderWrapper>
      <Logo />
      <a href="http://localhost:8888/login">Login with Spotify</a>
    </HeaderWrapper>
  </>
);

export default Header;
