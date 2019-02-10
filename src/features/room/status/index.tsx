import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';
import StatusView from './components/status-view';

const USERS_IN_ROOM = gql`
  query usersInRoom($roomId: ID!) {
    usersInRoom(roomId: $roomId) {
      displayName
    }
  }
`;

const USERS_IN_ROOM_SUBSCRIPTION = gql`
  subscription usersInRoom($roomId: ID!) {
    usersInRoom(roomId: $roomId) {
      displayName
    }
  }
`;

interface Props {
  room: any;
  roomId: string;
}

const Status: React.SFC<Props> = ({ room, roomId }) => {
  return (
    <Query
      query={USERS_IN_ROOM}
      variables={{
        roomId,
      }}
      fetchPolicy={'network-only'}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <StatusView
            room={room}
            users={data.usersInRoom}
            subscribe={() => {
              subscribeToMore({
                document: USERS_IN_ROOM_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  console.log(subscriptionData);

                  return Object.assign({}, prev, {
                    usersInRoom: subscriptionData.data.usersInRoom,
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
          />
        ) : null
      }
    </Query>
  );
};

export default Status;
