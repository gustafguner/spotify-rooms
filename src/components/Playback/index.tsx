import * as React from 'react';
import createContainer from 'constate';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { play } from 'src/utils/spotify';
import { Root } from 'src/Root';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { transform } from 'async';

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

interface ContainerProps {
  toggled: boolean;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: colors.PRIMARY_GRAY;
  height: 90px;
  transition: transform 0.15s ease;
  transform: translateY(
    ${({ toggled }: ContainerProps) => (toggled ? 90 : 0)}px
  );
`;

const Subscription: React.FunctionComponent<SubscriptionProps> = ({
  subscription,
}) => {
  const { playback, setPlayback } = React.useContext(PlaybackContainer.Context);
  const [unsubscribe, setUnsubscribe]: any = React.useState(null);

  React.useEffect(() => {
    if (playback !== null && playback.id) {
      console.log('Play');
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
  const { root }: any = React.useContext(Root.Context);

  return root ? (
    <Container toggled={root.visitingRoom !== null || true}>
      {root.visitingRoom !== null ? (
        <Query
          query={PLAYBACK_QUERY}
          variables={{ roomId: root.visitingRoom.id }}
          fetchPolicy={'network-only'}
        >
          {({ data, loading, error, subscribeToMore }) => {
            return !loading && !error && data ? (
              <PlaybackContainer.Provider initialPlayback={data.playback}>
                <Subscription
                  subscription={(setPlayback: (playback: any) => void) => {
                    subscribeToMore({
                      document: PLAYBACK_SUBSCRIPTION,
                      variables: { roomId: root.visitingRoom.id },
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
                          play({
                            uris: [track.uri],
                            position_ms: track.position,
                          });
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
      ) : null}
    </Container>
  ) : null;
};

export { Playback, PlaybackContainer };
