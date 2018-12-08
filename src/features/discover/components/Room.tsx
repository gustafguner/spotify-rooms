import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface RoomProps {
  name: string;
}

const Container = styled('div')({
  width: 200,
  height: 200,
  borderRadius: 5,
  backgroundColor: colors.DARK_DARK_GRAY,
  marginLeft: 15,
  marginRight: 15,
  padding: 15,
});

const Name = styled('div')({});

const Room: React.SFC<RoomProps> = ({ name }) => (
  <Container>
    <Name>{name}</Name>
  </Container>
);

export default Room;
