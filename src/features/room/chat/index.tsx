import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface Props {
  roomId: string;
}

const Container = styled('div')({
  width: '100%',
  height: '100%',
  padding: 25,
  background: colors.ALMOST_BLACK,
});

const Chat: React.SFC<Props> = ({ roomId }) => {
  return (
    <Container>
      <h1>Chat</h1>
    </Container>
  );
};

export default Chat;
