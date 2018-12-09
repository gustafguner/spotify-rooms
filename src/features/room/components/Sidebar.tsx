import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

const Container = styled('div')({
  width: 300,
  flexBasis: 300,
  flexShrink: 0,
  height: 'calc(100vh - 90px - 70px)',
  backgroundColor: colors.ALMOST_BLACK,
  boxShadow: '-2px 0 18px rgba(0,0,0,0.2)',
  position: 'relative',
});

const Sidebar: React.SFC = () => <Container>Hej</Container>;

export { Sidebar };
