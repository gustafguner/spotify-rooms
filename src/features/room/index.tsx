import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import gql from 'graphql-tag';
import { useContextState } from 'constate';

import { Sidebar } from './components/Sidebar';
import { Playback } from './components/Playback';

interface RoomProps {
  match: any;
}

const GET_ROOM_QUERY = gql`
  query getRoom($query: ID!) {
    room(query: $query) {
      id
      name
      host {
        displayName
      }
      playback {
        id
        name
        images {
          url
          width
          height
        }
        artists {
          name
        }
      }
      queue {
        id
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
          spotifyId
          displayName
        }
      }
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

const Room: React.SFC<RoomProps> = ({ match }) => {
  const [, setVisitingRoom] = useContextState('visitingRoom');
  return (
    <Query
      query={GET_ROOM_QUERY}
      variables={{
        query: match.params.id,
      }}
    >
      {({ loading, data }) => {
        setVisitingRoom(data.room);
        console.log(data);

        return !loading && data ? (
          <Container>
            <Content>
              <Playback track={data.room.playback} />
            </Content>

            <Sidebar room={data.room} />
          </Container>
        ) : (
          <div>loading</div>
        );
      }}
    </Query>
  );
};

export { Room };
