import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import Users from './users';

interface Props {
  room: any;
  users: any[];
  userEnteredSubscribe: () => void;
  userLeftSubscribe: () => void;
}

const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  background: colors.DARK_GRAY,
  paddingLeft: 25,
  paddingRight: 25,
  justifyContent: 'space-between',
});

const Name = styled('div')({
  color: colors.WHITE,
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: 0.2,
});

const StatusView: React.SFC<Props> = ({
  room,
  users,
  userEnteredSubscribe,
  userLeftSubscribe,
}) => {
  const [userEnteredUnubscribe, setUserEnteredUnubscribe]: any = React.useState(
    null,
  );

  const [userLeftUnubscribe, setUserLeftUnubscribe]: any = React.useState(null);

  React.useEffect(() => {
    setUserEnteredUnubscribe(userEnteredSubscribe());
    setUserLeftUnubscribe(userLeftSubscribe());
    return () => {
      if (userEnteredUnubscribe !== null) {
        userEnteredUnubscribe();
      }

      if (userLeftUnubscribe !== null) {
        userLeftUnubscribe();
      }
    };
  }, []);

  return (
    <Container>
      <Name>{room.name}</Name>
      <Users users={users} />
    </Container>
  );
};

export default StatusView;
