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
    requests(roomId: $roomId) {
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
      queueType
      track {
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
  }
`;

const QUEUE_VOTE_SUBSCRIPTION = gql`
  subscription trackVotedOnInQueue($roomId: ID!) {
    trackVotedOnInQueue(roomId: $roomId) {
      queueType
      track {
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
  }
`;

const QUEUE_REMOVE_SUBSCRIPTION = gql`
  subscription trackRemovedFromQueue($roomId: ID!) {
    trackRemovedFromQueue(roomId: $roomId) {
      queueType
      track {
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
  }
`;

interface Props {
  roomId: string;
  roomMode: string;
  userIsDJ: boolean;
  queueType: 'queue' | 'requests';
  setQueueType: (type: string) => void;
  searchFieldRef: any;
}

const Queue: React.FC<Props> = ({
  roomId,
  roomMode,
  userIsDJ,
  queueType,
  setQueueType,
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
            requests={data.requests}
            roomId={roomId}
            roomMode={roomMode}
            userIsDJ={userIsDJ}
            queueType={queueType}
            setQueueType={setQueueType}
            searchFieldRef={searchFieldRef}
            addSubscribe={() => {
              subscribeToMore({
                document: QUEUE_ADD_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  if (
                    subscriptionData.data.trackAddedToQueue.queueType ===
                    'queue'
                  ) {
                    return Object.assign({}, prev, {
                      queue: [
                        ...prev.queue,
                        subscriptionData.data.trackAddedToQueue.track,
                      ],
                    });
                  } else {
                    return Object.assign({}, prev, {
                      requests: [
                        ...prev.requests,
                        subscriptionData.data.trackAddedToQueue.track,
                      ],
                    });
                  }
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

                  const newTrack =
                    subscriptionData.data.trackVotedOnInQueue.track;

                  if (
                    subscriptionData.data.trackVotedOnInQueue.queueType ===
                    'queue'
                  ) {
                    const newQueue = prev.queue.map((track: any) => {
                      return track.id === newTrack.id ? newTrack : track;
                    });

                    return Object.assign({}, prev, {
                      queue: newQueue,
                    });
                  } else {
                    const newQueue = prev.requests.map((track: any) => {
                      return track.id === newTrack.id ? newTrack : track;
                    });

                    return Object.assign({}, prev, {
                      requests: newQueue,
                    });
                  }
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
                    subscriptionData.data.trackRemovedFromQueue.track;

                  if (
                    subscriptionData.data.trackRemovedFromQueue.queueType ===
                    'queue'
                  ) {
                    const newQueue = prev.queue.filter((track: any) => {
                      return track.id !== removedTrack.id;
                    });

                    return Object.assign({}, prev, {
                      queue: newQueue,
                    });
                  } else {
                    const newQueue = prev.requests.filter((track: any) => {
                      return track.id !== removedTrack.id;
                    });

                    return Object.assign({}, prev, {
                      requests: newQueue,
                    });
                  }
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
