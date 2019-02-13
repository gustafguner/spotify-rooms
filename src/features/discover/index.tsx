import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button, LargeButton } from 'src/components/buttons';
import Room from './components/room';
import { Root } from 'src/Root';
import CoreModal from 'src/components/CoreModal';

const ROOMS_QUERY = gql`
  query getRooms {
    rooms {
      id
      name
      host {
        displayName
      }
      users {
        displayName
        image
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
  paddingLeft: 25,
  paddingRight: 25,
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: 25,
  marginLeft: -15,
  marginRight: -15,
});

const CreateRoomButton = styled(LargeButton)({
  background: 'linear-gradient(#009FAE, #1ED760)',
  position: 'fixed',
  bottom: 25,
  left: '50%',
  transform: 'translateX(-50%)',
  transition: 'transform 0.05s ease-in-out',
  ':active': {
    transform: `translateX(-50%) scale(0.95)`,
  },
});

const Discover = () => {
  const { root, setRoot }: any = React.useContext(Root.Context);
  const [createRoomModalIsOpen, setCreateRoomModalIsOpen] = React.useState(
    false,
  );
  React.useEffect(() => {
    setRoot({
      ...root,
      visitingRoom: null,
    });
  }, []);
  return (
    <Query query={ROOMS_QUERY}>
      {({ data, error, loading }) =>
        !loading && !error && data ? (
          <>
            <Rooms>
              {data.rooms.map((room: any) => (
                <Room key={room.id} room={room} />
              ))}
            </Rooms>

            <CreateRoomButton
              onClick={() => {
                setCreateRoomModalIsOpen(true);
              }}
            >
              Create room
            </CreateRoomButton>
            {/*
            <Mutation mutation={MUTATION}>
              {(mutate) => (
                <>
                  <Button
                    onClick={() => {
                      mutate({
                        variables: {
                          input: {
                            name: 'Test',
                          },
                        },
                      });
                    }}
                  >
                    Create room
                  </Button>
                </>
              )}
            </Mutation>
                  */}

            <CoreModal
              open={createRoomModalIsOpen}
              onClose={() => {
                setCreateRoomModalIsOpen(false);
              }}
            />
          </>
        ) : (
          <h5>Loading...</h5>
        )
      }
    </Query>
  );
};

export { Discover };
