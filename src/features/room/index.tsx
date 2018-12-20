import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';
import { useContextState } from 'constate';

import { Sidebar } from './components/Sidebar';
import { Playback } from './components/Playback';
import Loader from 'src/components/Loader';

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
        timestamp
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
        timestamp
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
      timestamp
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
      timestamp
    }
  }
`;

const Room: React.SFC<RoomProps> = ({ match }) => {
  const [, setVisitingRoom] = useContextState('visitingRoom');

  return (
    <Query
      query={GET_ROOM_QUERY}
      variables={{
        query: match.params.id,
      }}
    >
      {({ loading, data, subscribeToMore }) => {
        setVisitingRoom(data.room);
        console.log(data);

        return !loading && data ? (
          <Container>
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

                    console.log('subscriptionData', subscriptionData);

                    const newTrack = subscriptionData.data.trackVotedOnInQueue;

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
              }}
            />
          </Container>
        ) : (
          <Loader />
        );
      }}
    </Query>
  );
};

export { Room };
