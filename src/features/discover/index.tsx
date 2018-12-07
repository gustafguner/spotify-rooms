import * as React from 'react';
import { Button } from 'src/components/buttons';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY = gql`
  query getRooms {
    rooms {
      name
    }
  }
`;

const MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input)
  }
`;

const Discover = () => (
  <Query query={QUERY}>
    {({ data, loading }) =>
      !loading && data ? (
        <>
          {data.rooms.map((room: any) => {
            console.log(room);
          })}
          <Mutation mutation={MUTATION}>
            {(mutate) => (
              <Button
                onClick={() => {
                  mutate({
                    variables: {
                      input: {
                        name: 'Lorem ipsum',
                      },
                    },
                  });
                }}
              >
                Create a room
              </Button>
            )}
          </Mutation>
        </>
      ) : (
        <h5>Loading...</h5>
      )
    }
  </Query>
);

export { Discover };
