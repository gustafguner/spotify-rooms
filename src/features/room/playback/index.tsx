import * as React from 'react';
import PlaybackView from './components/playback-view';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';

interface Image {
  url: string;
  width: number;
  height: number;
}

interface Artist {
  name: string;
}

interface Track {
  id: string;
  name: string;
  images: Image[];
  artists: Artist[];
  queueTimestamp: string;
  playTimestamp: string;
  duration: number;
  position: number;
}

interface PlaybackProps {
  roomId: string;
}

const GET_PLAYBACK_QUERY = gql`
  query playback($roomId: ID!) {
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

const Playback: React.SFC<PlaybackProps> = ({ roomId }) => {
  React.useEffect(() => {
    console.log('Root Playback component with roomId: ', roomId);
    return () => {};
  }, []);

  return (
    <Query
      query={GET_PLAYBACK_QUERY}
      variables={{
        roomId,
      }}
      fetchPolicy={'network-only'}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <PlaybackView
            track={data.playback}
            subscribe={() => {
              subscribeToMore({
                document: PLAYBACK_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  return Object.assign({}, prev, {
                    playback: subscriptionData.data.playback,
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
          />
        ) : (
          <Loader />
        )
      }
    </Query>
  );
};

export default Playback;
