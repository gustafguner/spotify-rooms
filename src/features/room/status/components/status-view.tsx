import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import Users from './users';

interface Props {
  room: any;
  users: any[];
  userEnteredSubscribe: () => void;
  userLeftSubscribe: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${colors.DARK_GRAY};
  padding: 0 25px;
  justify-content: space-between;
`;

const Name = styled.div`
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

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
