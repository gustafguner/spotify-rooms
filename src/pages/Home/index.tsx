import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY = gql`
  query getUser {
    user(query: "5bf31230d685338501018501") {
      displayName
    }
  }
`;

export const Home = () => (
  <Query query={QUERY}>
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
);
