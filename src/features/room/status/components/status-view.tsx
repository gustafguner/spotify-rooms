import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

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
  background: colors.DARK_BG,
  paddingLeft: 25,
  paddingRight: 25,
});

const Name = styled('div')({
  color: colors.WHITE,
  fontSize: 18,
  height: 22,
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
      <Name>
        {room.name} {users.length} people
      </Name>
    </Container>
  );
};

export default StatusView;
