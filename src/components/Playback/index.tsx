import * as React from 'react';
import { useContextState } from 'constate';
import { Subscription, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { play } from 'src/utils/spotify';

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

const Playback = () => {
  const [visitingRoom, setVisitingRoom] = useContextState('visitingRoom');
  const [playback, setPlayback] = useContextState('playback');
  return (
    <Query
      query={PLAYBACK_QUERY}
      variables={{ roomId: '5c0fb582b623d1498fff7faf' }}
    >
      {({ data, loading, subscribeToMore }) => {
        if (data && !loading) {
          subscribeToMore({
            document: PLAYBACK_SUBSCRIPTION,
            variables: { roomId: '5c0fb582b623d1498fff7faf' },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              console.log('Playback component play track ', subscriptionData);

              const track = subscriptionData.data.playback;
              if (track !== null && track.id) {
                play({ uris: [track.uri], position_ms: track.position });
              }

              return Object.assign({}, prev, {
                ...prev,
              });
            },
            onError: (err) => console.log(err),
          });
          return <div>{data.playback.name}</div>;
        } else {
          return null;
        }
      }}
    </Query>

    /*
    <Subscription
      subscription={PLAYBACK_SUBSCRIPTION}
      variables={{
        roomId: '5c0fb582b623d1498fff7faf',
      }}
      fetchPolicy={'network-only'}
    >
      {({ data, loading }) => {
        if (data && !loading) {
          console.log('PLay it: ', data);
          if (data.playback !== null) {
            play({
              uris: [data.playback.uri],
              position_ms: data.playback.position,
            });
          }
        }
        return null;
      }}
    </Subscription>*/
  );
};

export default Playback;
