import * as React from 'react';
import QueueView from './queue-view';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUEUE_QUERY = gql`
  query queue($roomId: ID!) {
    queue(roomId: $roomId) {
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

const QUEUE_ADD_SUBSCRIPTION = gql`
  subscription trackAddedToQueue($roomId: ID!) {
    trackAddedToQueue(roomId: $roomId) {
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

const QUEUE_VOTE_SUBSCRIPTION = gql`
  subscription trackVotedOnInQueue($roomId: ID!) {
    trackVotedOnInQueue(roomId: $roomId) {
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

const QUEUE_REMOVE_SUBSCRIPTION = gql`
  subscription trackRemovedFromQueue($roomId: ID!) {
    trackRemovedFromQueue(roomId: $roomId) {
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

interface Props {
  roomId: string;
  roomMode: string;
  roomDj: any;
  searchFieldRef: any;
}

const Queue: React.FC<Props> = ({
  roomId,
  roomMode,
  roomDj,
  searchFieldRef,
}) => {
  return (
    <Query
      query={QUEUE_QUERY}
      variables={{
        roomId,
      }}
      fetchPolicy={'network-only'}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <QueueView
            queue={data.queue}
            roomId={roomId}
            roomMode={roomMode}
            roomDj={roomDj}
            searchFieldRef={searchFieldRef}
            addSubscribe={() => {
              subscribeToMore({
                document: QUEUE_ADD_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  return Object.assign({}, prev, {
                    queue: [
                      ...prev.queue,
                      subscriptionData.data.trackAddedToQueue,
                    ],
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
            voteSubscribe={() => {
              subscribeToMore({
                document: QUEUE_VOTE_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const newTrack = subscriptionData.data.trackVotedOnInQueue;

                  const newQueue = prev.queue.map((track: any) => {
                    return track.id === newTrack.id ? newTrack : track;
                  });

                  return Object.assign({}, prev, {
                    queue: newQueue,
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
            removeSubscribe={() => {
              subscribeToMore({
                document: QUEUE_REMOVE_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const removedTrack =
                    subscriptionData.data.trackRemovedFromQueue;

                  const newQueue = prev.queue.filter((track: any) => {
                    return track.id !== removedTrack.id;
                  });

                  return Object.assign({}, prev, {
                    queue: newQueue,
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
          />
        ) : (
          <></>
        )
      }
    </Query>
  );
};

export default Queue;
