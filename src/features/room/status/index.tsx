import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';
import StatusView from './components/status-view';
import { previous } from 'src/utils/spotify';

const USERS_IN_ROOM = gql`
  query usersInRoom($roomId: ID!) {
    usersInRoom(roomId: $roomId) {
      id
      displayName
    }
  }
`;

const USER_ENTERED_ROOM_SUBSCRIPTION = gql`
  subscription userEnteredRoom($roomId: ID!) {
    userEnteredRoom(roomId: $roomId) {
      id
      displayName
    }
  }
`;

const USER_LEFT_ROOM_SUBSCRIPTION = gql`
  subscription userLeftRoom($roomId: ID!) {
    userLeftRoom(roomId: $roomId) {
      id
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
            userEnteredSubscribe={() => {
              subscribeToMore({
                document: USER_ENTERED_ROOM_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  return Object.assign({}, prev, {
                    usersInRoom: [
                      ...prev.usersInRoom,
                      subscriptionData.data.userEnteredRoom,
                    ],
                  });
                },
                onError: (err) => console.log(err),
              });
            }}
            userLeftSubscribe={() => {
              subscribeToMore({
                document: USER_LEFT_ROOM_SUBSCRIPTION,
                variables: { roomId },
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  return Object.assign({}, prev, {
                    usersInRoom: prev.usersInRoom.filter(
                      (u: any) =>
                        u.id !== subscriptionData.data.userLeftRoom.id,
                    ),
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
