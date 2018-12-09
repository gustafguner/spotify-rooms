import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';

interface RoomProps {
  match: any;
}

const GET_ROOM_QUERY = gql`
  query getRoom($query: ID!) {
    room(query: $query) {
      name
    }
  }
`;

const Container = styled('div')({});

const Room: React.SFC<RoomProps> = ({ match }) => (
  <Query
    query={GET_ROOM_QUERY}
    variables={{
      query: match.params.id,
    }}
  >
    {({ loading, data }) =>
      !loading && data ? (
        <Container>
          <div>Name: {data.room.name}</div>
        </Container>
      ) : (
        <div>loading</div>
      )
    }
  </Query>
);

export { Room };
