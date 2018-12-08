import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import Room from './components/Room';

const QUERY = gql`
  query getRooms {
    rooms {
      id
      name
    }
  }
`;

const MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input)
  }
`;

const Rooms = styled('div')({
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: 25,
  marginLeft: -15,
  marginRight: -15,
});

const Discover = () => (
  <Query query={QUERY}>
    {({ data, loading }) =>
      !loading && data ? (
        <Rooms>
          {data.rooms.map((room: any) => (
            <Room key={room.id} id={room.id} name={room.name} />
          ))}
        </Rooms>
      ) : (
        <h5>Loading...</h5>
      )
    }
  </Query>
);

export { Discover };
