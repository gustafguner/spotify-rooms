import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Svg, QueueIcon, LightBulbIcon } from 'src/components/icons';
import { Toggle } from 'src/components/input';
import { Root } from 'src/Root';
import QueueList from './queue-list';
import Empty from './empty';

const Container = styled.div`
  width: 100%;
  flex-basis: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
`;

const Header = styled.div`
  width: 100%;
  height: 70px;
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const SidebarType = styled.div`
  display: flex;
  align-items: center;
  ${Svg} {
    width: 24px;
    height: 24px;
    margin-left: 10px;
    fill: ${colors.GREEN};
  }
`;

const SidebarTypeName = styled.div`
  font-size: 16px;
  color: ${colors.ALMOST_WHITE};
`;

const QueueContainer = styled.div`
  height: 100%;
  padding: 15px;
`;

interface Props {
  queue: any;
  requests: any;
  roomId: string;
  roomMode: string;
  userIsDJ: boolean;
  queueType: 'queue' | 'requests';
  setQueueType: (type: string) => void;
  searchFieldRef: any;
  addSubscribe: () => void;
  voteSubscribe: () => void;
  removeSubscribe: () => void;
}

const QueueView: React.FC<Props> = ({
  queue,
  requests,
  roomId,
  roomMode,
  userIsDJ,
  queueType,
  setQueueType,
  searchFieldRef,
  addSubscribe,
  voteSubscribe,
  removeSubscribe,
}) => {
  const [addUnsubscribe, setAddUnsubscribe]: any = React.useState(null);
  const [voteUnsubscribe, setVoteUnsubscribe]: any = React.useState(null);
  const [removeUnsubscribe, setRemoveUnsubscribe]: any = React.useState(null);

  queue.sort((a: any, b: any) => {
    return (
      b.voters.length - a.voters.length || a.queueTimestamp - b.queueTimestamp
    );
  });

  requests.sort((a: any, b: any) => {
    return (
      b.voters.length - a.voters.length || a.queueTimestamp - b.queueTimestamp
    );
  });

  useEffect(() => {
    setAddUnsubscribe(addSubscribe());
    setVoteUnsubscribe(voteSubscribe());
    setRemoveUnsubscribe(removeSubscribe());

    return () => {
      if (addUnsubscribe !== null) {
        addUnsubscribe();
      }
      if (voteUnsubscribe !== null) {
        voteUnsubscribe();
      }
      if (removeUnsubscribe !== null) {
        removeUnsubscribe();
      }
    };
  }, []);

  return (
    <Container>
      {roomMode === 'dj' ? (
        <Header>
          {userIsDJ ? (
            <Toggle
              name="mode"
              selected={queueType}
              onChange={(event) => {
                setQueueType(event.target.value);
              }}
              onBlur={() => {}}
              fields={[
                {
                  value: 'queue',
                  label: 'Queue',
                  id: 'queue-choice',
                  icon: <QueueIcon />,
                },
                {
                  value: 'requests',
                  label: 'Requests',
                  id: 'requests-choice',
                  icon: <LightBulbIcon />,
                },
              ]}
              theme="dark"
            />
          ) : (
            <SidebarType>
              <SidebarTypeName>Requests</SidebarTypeName>
              <LightBulbIcon />
            </SidebarType>
          )}
        </Header>
      ) : (
        <Header>
          <SidebarType>
            <SidebarTypeName>Queue</SidebarTypeName>
            <QueueIcon />
          </SidebarType>
        </Header>
      )}

      <QueueContainer>
        {queueType === 'requests' || (roomMode === 'dj' && !userIsDJ) ? (
          <>
            {requests.length === 0 && (
              <Empty
                title="There are no requests"
                buttonTitle="Request track"
                hideButton={roomMode === 'dj' && userIsDJ}
                onButtonClick={() => {
                  searchFieldRef.current.focus();
                }}
              />
            )}
            <QueueList list={requests} roomId={roomId} queueType="requests" />
          </>
        ) : (
          <>
            {queue.length === 0 && (
              <Empty
                title="The queue is empty"
                buttonTitle="Add track"
                onButtonClick={() => {
                  searchFieldRef.current.focus();
                }}
              />
            )}
            <QueueList list={queue} roomId={roomId} queueType="queue" />
          </>
        )}
      </QueueContainer>
    </Container>
  );
};

export default QueueView;
