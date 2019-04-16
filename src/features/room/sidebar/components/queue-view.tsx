import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import gql from 'graphql-tag';
import { DullButton } from 'src/components/buttons';
import { EmptyIcon, Svg, QueueIcon, LightBulbIcon } from 'src/components/icons';
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

const VOTE_FOR_TRACK = gql`
  mutation voteForTrack($input: VoteForTrackInput!) {
    voteForTrack(input: $input)
  }
`;

interface Props {
  queue: any;
  requests: any;
  roomId: string;
  roomMode: string;
  roomDj: any;
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
  roomDj,
  searchFieldRef,
  addSubscribe,
  voteSubscribe,
  removeSubscribe,
}) => {
  const { rootContext }: any = React.useContext(Root.Context);

  const [addUnsubscribe, setAddUnsubscribe]: any = React.useState(null);
  const [voteUnsubscribe, setVoteUnsubscribe]: any = React.useState(null);
  const [removeUnsubscribe, setRemoveUnsubscribe]: any = React.useState(null);
  const [sidebarType, setSidebarType]: any = React.useState('queue');

  queue.sort((a: any, b: any) => {
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
          {roomDj !== null && roomDj.id === rootContext.auth.user.id ? (
            <Toggle
              name="mode"
              selected={sidebarType}
              onChange={(event) => {
                setSidebarType(event.target.value);
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

      {/*queue.length === 0 && (
        <Empty
          title="The queue is empty"
          buttonTitle="Add track"
          onButtonClick={() => {
            searchFieldRef.current.focus();
          }}
        />
        )*/}

      <QueueContainer>
        {sidebarType === 'requests' ||
        (roomMode === 'dj' &&
          (roomDj === null || roomDj.id !== rootContext.auth.user.id)) ? (
          <>
            {requests.length === 0 && (
              <Empty
                title="There are no requests"
                buttonTitle="Request a track"
                onButtonClick={() => {
                  searchFieldRef.current.focus();
                }}
              />
            )}
            <QueueList
              list={requests}
              mutation={VOTE_FOR_TRACK}
              roomId={roomId}
            />
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
            <QueueList list={queue} mutation={VOTE_FOR_TRACK} roomId={roomId} />
          </>
        )}
      </QueueContainer>
    </Container>
  );
};

export default QueueView;
