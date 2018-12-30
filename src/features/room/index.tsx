import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';

import { Sidebar } from './components/Sidebar';
import { Playback } from './components/Playback';
import Loader from 'src/components/Loader';

import { Root } from 'src/Root';
import createContainer from 'constate';

interface RoomProps {
  match: any;
}

const GET_ROOM_QUERY = gql`
  query getRoom($query: ID!) {
    room(query: $query) {
      id
      name
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

const Container = styled('div')({
  display: 'flex',
});

const Content = styled('div')({
  display: 'flex',
  width: '100%',
});

const TRACK_ADDED_TO_QUEUE_SUBSCRIPTION = gql`
  subscription trackAddedToQueue {
    trackAddedToQueue(input: { roomId: "5c0fb582b623d1498fff7faf" }) {
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
`;

const TRACK_VOTED_ON_IN_QUEUE = gql`
  subscription trackVotedOnInQueue {
    trackVotedOnInQueue(input: { roomId: "5c0fb582b623d1498fff7faf" }) {
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
`;

const TRACK_REMOVED_FROM_QUEUE = gql`
  subscription removedFromQueue {
    trackRemovedFromQueue(input: { roomId: "5c0fb582b623d1498fff7faf" }) {
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
`;

const PLAYBACK_SUBSCRIPTION = gql`
  subscription playback {
    playback(roomId: "5c0fb582b623d1498fff7faf") {
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

interface SetRoomProps {
  room: object;
}

const SetRoom: React.SFC<SetRoomProps> = ({ room }) => {
  const { root, setRoot }: any = React.useContext(Root.Context);
  console.log(room);
  React.useEffect(() => {
    setRoot({ ...root, visitingRoom: room });
  }, []);
  return null;
};

const Room: React.SFC<RoomProps> = ({ match }) => {
  return (
    <Query
      query={GET_ROOM_QUERY}
      variables={{
        query: match.params.id,
      }}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <Container>
            <SetRoom room={data.room} />
            <Content>
              <Playback track={data.room.playback} />
            </Content>

            <Sidebar
              room={data.room}
              subscribeToQueue={() => {
                subscribeToMore({
                  document: TRACK_ADDED_TO_QUEUE_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    console.log(subscriptionData);
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    const trackAddedToQueue =
                      subscriptionData.data.trackAddedToQueue;

                    console.log('Track added to queue ', trackAddedToQueue);
                    console.log('prev ', prev);
                    const q = [...prev.room.queue, trackAddedToQueue];
                    console.log('added, new queue: ', q);

                    return Object.assign({}, prev, {
                      room: {
                        ...prev.room,
                        queue: [...prev.room.queue, trackAddedToQueue],
                      },
                    });
                  },
                  onError: (err) => console.log(err),
                });
                subscribeToMore({
                  document: TRACK_VOTED_ON_IN_QUEUE,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    const newTrack = subscriptionData.data.trackVotedOnInQueue;

                    console.log('Track voted on in queue', newTrack);

                    const queue = prev.room.queue.map((track: any) => {
                      return track.id === newTrack.id ? newTrack : track;
                    });

                    return Object.assign({}, prev, {
                      room: {
                        ...prev.room,
                        queue,
                      },
                    });
                  },
                  onError: (err) => console.log(err),
                });
                subscribeToMore({
                  document: TRACK_REMOVED_FROM_QUEUE,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    const removedTrack =
                      subscriptionData.data.trackRemovedFromQueue;

                    console.log('Track removed from queue', removedTrack);

                    const queue = prev.room.queue.filter((track: any) => {
                      return track.id !== removedTrack.id;
                    });

                    return Object.assign({}, prev, {
                      room: {
                        ...prev.room,
                        queue,
                      },
                    });
                  },
                  onError: (err) => console.log(err),
                });

                subscribeToMore({
                  document: PLAYBACK_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    const track = subscriptionData.data.playback;

                    return Object.assign({}, prev, {
                      room: {
                        ...prev.room,
                        playback: track,
                      },
                    });
                  },
                  onError: (err) => console.log(err),
                });
              }}
            />
          </Container>
        ) : (
          <Loader />
        )
      }
    </Query>
  );
};

export { Room };
