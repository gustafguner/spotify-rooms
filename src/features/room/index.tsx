import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';

import { Mount, Unmount } from 'src/components/lifecycle';

import Sidebar from './sidebar';
import Playback from './playback';
import Status from './status';
import Chat from './chat';

import { Root } from 'src/Root';

interface RoomProps {
  match: any;
}

const GET_ROOM_QUERY = gql`
  query getRoom($roomId: ID!) {
    room(roomId: $roomId) {
      id
      name
      mode
      private
      host {
        displayName
      }
      playback {
        id
        name
        images {
          url
          width
          height
        }
        artists {
          name
        }
        queueTimestamp
        playTimestamp
        position
        duration
      }
      queue {
        id
        name
        images {
          url
          width
          height
        }
        artists {
          name
        }
        voters {
          id
          spotifyId
          displayName
        }
        queueTimestamp
        playTimestamp
        position
        duration
      }
    }
  }
`;

const ENTER_ROOM = gql`
  mutation enterRoom($roomId: ID!) {
    enterRoom(roomId: $roomId)
  }
`;

const LEAVE_ROOM = gql`
  mutation leaveRoom($roomId: ID!) {
    leaveRoom(roomId: $roomId)
  }
`;

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`;

const Top = styled.div`
  width: 100%;
  height: 230px;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  flex-basis: 100%;
  display: flex;
  flex-flow: column;
`;

const StatusContainer = styled.div`
  width: 100%;
  flex-basis: 66px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const ChatContainer = styled.div`
  width: 100%;
  flex-basis: 100%;
`;

interface SetRoomProps {
  room: object;
}

const SetRoom: React.FC<SetRoomProps> = ({ room }) => {
  const { root, setRoot }: any = React.useContext(Root.Context);
  React.useEffect(() => {
    setRoot({ ...root, visitingRoom: room });
  }, []);
  return null;
};

const ROOM_SUBSCRIPTION = gql`
  subscription($roomId: ID!) {
    room(roomId: $roomId) {
      name
      mode
      private
    }
  }
`;

const PLAYBACK_SUBSCRIPTION = gql`
  subscription playback($roomId: ID!) {
    playback(roomId: $roomId) {
      id
      uri
      name
      images {
        url
        width
        height
      }
      artists {
        name
      }
      voters {
        id
        spotifyId
        displayName
      }
      queueTimestamp
      playTimestamp
      position
      duration
    }
  }
`;

const Room: React.FC<RoomProps> = ({ match }) => {
  const [unsubscribeToRoom, setUnsubscribeToRoom]: any = React.useState(null);
  const [unsubscribeToPlayback, setUnsubscribeToPlayback]: any = React.useState(
    null,
  );

  const roomId = match.params.id;

  return (
    <Query
      query={GET_ROOM_QUERY}
      variables={{
        roomId,
      }}
      fetchPolicy={'network-only'}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <Container>
            <SetRoom room={data.room} />

            <Mutation mutation={ENTER_ROOM}>
              {(mutate) => (
                <Mount
                  event={() => {
                    setUnsubscribeToRoom(() => {
                      subscribeToMore({
                        document: ROOM_SUBSCRIPTION,
                        variables: { roomId },
                        updateQuery: (prev, { subscriptionData }) => {
                          console.log(subscriptionData);
                          if (!subscriptionData.data) {
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            room: {
                              ...prev.room,
                              ...subscriptionData.data.room,
                            },
                          });
                        },
                        onError: (err) => console.log(err),
                      });
                    });

                    setUnsubscribeToPlayback(() => {
                      subscribeToMore({
                        document: PLAYBACK_SUBSCRIPTION,
                        variables: { roomId },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) {
                            return prev;
                          }

                          return Object.assign({}, prev, {
                            room: {
                              ...prev.room,
                              playback: subscriptionData.data.playback,
                            },
                          });
                        },
                        onError: (err) => console.log(err),
                      });
                    });

                    mutate({
                      variables: {
                        roomId: data.room.id,
                      },
                    });
                  }}
                />
              )}
            </Mutation>

            <Mutation mutation={LEAVE_ROOM}>
              {(mutate) => (
                <Unmount
                  event={() => {
                    if (unsubscribeToRoom !== null) {
                      unsubscribeToRoom();
                    }

                    if (unsubscribeToPlayback !== null) {
                      unsubscribeToPlayback();
                    }

                    mutate({
                      variables: {
                        roomId: data.room.id,
                      },
                    });
                  }}
                />
              )}
            </Mutation>

            <Content>
              <Top>
                <Playback track={data.room.playback} />
              </Top>

              <Bottom>
                <StatusContainer>
                  <Status room={data.room} roomId={match.params.id} />
                </StatusContainer>

                <ChatContainer>
                  <Chat roomId={match.params.id} />
                </ChatContainer>
              </Bottom>
            </Content>

            <Sidebar roomId={match.params.id} />
          </Container>
        ) : (
          <Loader />
        )
      }
    </Query>
  );
};

export { Room };
