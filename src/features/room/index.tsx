import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';

import Sidebar from './sidebar';
import Playback from './playback';
import Status from './status';
import Chat from './chat';

import { Root } from 'src/Root';

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
        queueTimestamp
        playTimestamp
        position
        duration
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
          id
          spotifyId
          displayName
        }
        queueTimestamp
        playTimestamp
        position
        duration
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
  flexFlow: 'column',
});

const Top = styled('div')({
  width: '100%',
  flexBasis: 230,
  flexShrink: 0,
  flexGrow: 0,
  position: 'relative',
});

const Bottom = styled('div')({
  width: '100%',
  flexBasis: '100%',
  display: 'flex',
  flexFlow: 'column',
});

const StatusContainer = styled('div')({
  width: '100%',
  flexBasis: 66,
  flexShrink: 0,
  flexGrow: 0,
});

const ChatContainer = styled('div')({
  width: '100%',
  flexBasis: '100%',
});

interface SetRoomProps {
  room: object;
}

const SetRoom: React.SFC<SetRoomProps> = ({ room }) => {
  const { root, setRoot }: any = React.useContext(Root.Context);
  React.useEffect(() => {
    setRoot({ ...root, visitingRoom: room });
  }, []);
  return null;
};

const Room: React.SFC<RoomProps> = ({ match }) => {
  console.log('Room render');
  return (
    <Query
      query={GET_ROOM_QUERY}
      variables={{
        query: match.params.id,
      }}
      fetchPolicy={'network-only'}
    >
      {({ loading, data, error, subscribeToMore }) =>
        !loading && !error && data ? (
          <Container>
            <SetRoom room={data.room} />

            <Content>
              <Top>
                <Playback roomId={match.params.id} />
              </Top>

              <Bottom>
                <StatusContainer>
                  <Status room={data.room} />
                </StatusContainer>

                <ChatContainer>
                  <Chat roomId={match.params.id} />
                </ChatContainer>
              </Bottom>
            </Content>

            <Sidebar roomId={match.params.id} />
          </Container>
        ) : (
          <Loader />
        )
      }
    </Query>
  );
};

export { Room };
