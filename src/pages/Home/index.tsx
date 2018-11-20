import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Container } from 'constate';

interface State {
  loggedIn: boolean;
  currentTrack?: any;
}

const initialState: State = {
  loggedIn: false,
};

const QUERY = gql`
  query getUser {
    user(query: "5bf31230d685338501018501") {
      displayName
    }
  }
`;

interface QueryResult {
  user: User;
}

interface User {
  displayName: string;
}

export const Home = () => (
  <Container context="auth" initialState={initialState}>
    {({ loggedIn }) => (
      <Query<QueryResult> query={QUERY}>
        {({ data, loading }) =>
          !loading && data ? (
            <>
              <h4>Welcome {data.user.displayName}</h4>
            </>
          ) : (
            <p>laddar</p>
          )
        }
      </Query>
    )}
  </Container>
);
