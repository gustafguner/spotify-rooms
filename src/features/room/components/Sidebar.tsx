import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

const Container = styled('div')({
  width: 300,
  flexBasis: 300,
  flexShrink: 0,
  height: '100%',
  backgroundColor: colors.DARK_DARK_GRAY,
});

const Sidebar: React.SFC = () => <Container>Hej</Container>;

export { Sidebar };
