import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface Props {
  room: any;
}

const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  background: colors.DARK_BG,
  paddingLeft: 25,
  paddingRight: 25,
});

const Name = styled('div')({
  color: colors.WHITE,
  fontSize: 18,
  height: 22,
});

const Status: React.SFC<Props> = ({ room }) => {
  console.log(room);
  return (
    <Container>
      <Name>{room.name}</Name>
    </Container>
  );
};

export default Status;
