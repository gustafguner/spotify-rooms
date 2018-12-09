import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';

import { Sidebar } from './components/Sidebar';

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

const Container = styled('div')({
  display: 'flex',
});

const Content = styled('div')({
  display: 'flex',
  width: '100%',
});

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
          <Content>
            <div>Name: {data.room.name}</div>
          </Content>

          <Sidebar />
        </Container>
      ) : (
        <div>loading</div>
      )
    }
  </Query>
);

export { Room };
