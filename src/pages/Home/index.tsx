import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Container } from 'constate';
import { getMyCurrentPlayingTrack } from '../../utils/spotify';

interface State {
  loggedIn: boolean;
  currentTrack: any | null;
}

const initialState: State = {
  loggedIn: false,
  currentTrack: null,
};

const onMount = async ({ setState }: any) => {
  const data = await getMyCurrentPlayingTrack();
  console.log(data);
  setState(() => ({ currentTrack: data.item }));
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
  <Container onMount={onMount} initialState={initialState}>
    {({ loggedIn, currentTrack }) => (
      <Query<QueryResult> query={QUERY}>
        {({ data, loading }) =>
          !loading && data ? (
            <>
              <h4>Welcome {data.user.displayName}</h4>
              <h2>
                Current track:{' '}
                {currentTrack != null ? currentTrack.name : '... start a song'}
              </h2>
            </>
          ) : (
            <p>laddar</p>
          )
        }
      </Query>
    )}
  </Container>
);
