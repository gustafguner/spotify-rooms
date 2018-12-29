import * as React from 'react';
import createContainer from 'constate';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { play } from 'src/utils/spotify';
import { Root } from 'src/Root';

const PLAYBACK_QUERY = gql`
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
    }
  }
`;

const usePlayback = ({ initialPlayback = null } = {}) => {
  const [playback, setPlayback]: any = React.useState(initialPlayback);
  return { playback, setPlayback };
};

const PlaybackContainer = createContainer(usePlayback);

interface SubscriptionProps {
  subscription: (playback: any) => void;
}

const Subscription: React.SFC<SubscriptionProps> = ({ subscription }) => {
  const { playback, setPlayback } = React.useContext(PlaybackContainer.Context);
  const [unsubscribe, setUnsubscribe]: any = React.useState(null);

  React.useEffect(() => {
    if (playback !== null && playback.id) {
      play({ uris: [playback.uri], position_ms: playback.position });
    }
    setUnsubscribe(subscription(setPlayback));

    return () => {
      if (unsubscribe !== null) {
        unsubscribe();
        setUnsubscribe(null);
      }
    };
  }, []);

  return <h4>{playback !== null ? playback.name : 'no track'}</h4>;
};

const Playback = () => {
  console.log('Playback component');

  return (
    <Query
      query={PLAYBACK_QUERY}
      variables={{ roomId: '5c0fb582b623d1498fff7faf' }}
    >
      {({ data, loading, error, subscribeToMore }) => {
        return !loading && !error && data ? (
          <PlaybackContainer.Provider initialPlayback={data.playback}>
            <Subscription
              subscription={(setPlayback: (playback: any) => void) => {
                subscribeToMore({
                  document: PLAYBACK_SUBSCRIPTION,
                  variables: { roomId: '5c0fb582b623d1498fff7faf' },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }

                    console.log(
                      'Playback component play track ',
                      subscriptionData,
                    );

                    const track = subscriptionData.data.playback;
                    if (track !== null && track.id) {
                      play({ uris: [track.uri], position_ms: track.position });
                      setPlayback(track);
                    }

                    return Object.assign({}, prev, {
                      ...prev,
                    });
                  },
                  onError: (err) => console.log(err),
                });
              }}
            />
          </PlaybackContainer.Provider>
        ) : (
          <div>Loading...</div>
        );
      }}
    </Query>
  );
};

export { Playback, PlaybackContainer };
