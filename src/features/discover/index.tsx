import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Button, LargeButton } from 'src/components/buttons';
import Room from './components/room';
import { Root } from 'src/Root';
import CreateRoomModal from './components/create-room-modal';

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

const Rooms = styled.div`
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  flex-flow: row wrap;
  margin-top: 25px;
  margin-left: -15px;
  margin-right: -15px;
`;

const CreateRoomButton = styled(LargeButton)`
  background: linear-gradient(#009fae, #1ed760);
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%) scale(1);
  transition: transform 0.05s ease-in-out;
  ':active' {
    transform: translateX(-50%) scale(0.95);
  }
`;

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

            <CreateRoomModal
              isOpen={createRoomModalIsOpen}
              close={() => {
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
