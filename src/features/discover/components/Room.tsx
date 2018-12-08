import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface RoomProps {
  id: string;
  name: string;
}

const Container = styled('div')({
  width: 260,
  flexBasis: 260,
  flexShrink: 0,
  height: 260,
  backgroundColor: colors.DARK_DARK_GRAY,
  marginLeft: 15,
  marginRight: 15,
  padding: 15,
});

const Name = styled('div')({});

const Room: React.SFC<RoomProps> = ({ id, name }) => (
  <Container>
    <Link to={'/room/' + id}>
      <Name>{name}</Name>
    </Link>
  </Container>
);

export default Room;
