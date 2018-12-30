import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import Room from './components/Room';
import { Root } from 'src/Root';

const QUERY = gql`
  query getRooms {
    rooms {
      id
      name
      host {
        displayName
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

const Discover = () => {
  const { root, setRoot }: any = React.useContext(Root.Context);
  React.useEffect(() => {
    setRoot({
      ...root,
      visitingRoom: null,
    });
  }, []);
  return (
    <Query query={QUERY}>
      {({ data, error, loading }) =>
        !loading && !error && data ? (
          <>
            <Rooms>
              {data.rooms.map((room: any) => (
                <Room key={room.id} id={room.id} name={room.name} />
              ))}
            </Rooms>
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
          </>
        ) : (
          <h5>Loading...</h5>
        )
      }
    </Query>
  );
};

export { Discover };
