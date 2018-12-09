import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

const Container = styled('div')({
  width: 300,
  flexBasis: 300,
  flexShrink: 0,
  height: 'calc(100vh - 90px - 70px)',
  backgroundColor: colors.ALMOST_BLACK,
});

const Sidebar: React.SFC = () => <Container>Hej</Container>;

export { Sidebar };
