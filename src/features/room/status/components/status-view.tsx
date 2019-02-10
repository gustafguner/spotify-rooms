import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface Props {
  room: any;
  users: any[];
  subscribe: () => void;
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

const StatusView: React.SFC<Props> = ({ room, users, subscribe }) => {
  const [
    usersInRoomUnsubscribe,
    setUsersInRoomUnsubscribe,
  ]: any = React.useState(null);

  React.useEffect(() => {
    setUsersInRoomUnsubscribe(subscribe());
    return () => {
      if (usersInRoomUnsubscribe !== null) {
        usersInRoomUnsubscribe();
      }
    };
  }, []);

  return (
    <Container>
      <Name>
        {room.name} {users.length} people
      </Name>
    </Container>
  );
};

export default StatusView;
