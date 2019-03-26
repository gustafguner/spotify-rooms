import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import Users from './users';
import { CoopIcon, DjIcon } from 'src/components/icons';

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

const Meta = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const Name = styled.div`
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-right: 20px;
`;

const Mode = styled.div`
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    stroke: white;
    stroke-width: 0.3px;
  }
`;

const ModeName = styled.div`
  color: ${colors.GRAY};
  font-weight: 600;
  font-size: 13px;
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
      <Meta>
        <Name>{room.name}</Name>
        <Mode>
          {room.mode === 'co-op' ? (
            <>
              <CoopIcon width={28} height={28} />
              <ModeName>Co-op</ModeName>
            </>
          ) : (
            <>
              <DjIcon width={28} height={28} />
              <ModeName>DJ</ModeName>
            </>
          )}
        </Mode>
      </Meta>
      <Users users={users} />
    </Container>
  );
};

export default StatusView;
