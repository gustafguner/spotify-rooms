import * as React from 'react';
import styled from 'react-emotion';
import CoreModal from 'src/components/CoreModal';
import gql from 'graphql-tag';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input)
  }
`;

interface Props {
  isOpen: boolean;
  close: () => void;
}

const CreateRoomModal: React.SFC<Props> = ({ isOpen, close }) => {
  return (
    <CoreModal isOpen={isOpen} close={close}>
      <h2>Create room</h2>
      <input type="text" placeholder="Name" />
      <Mutation mutation={CREATE_ROOM_MUTATION}>
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
              Create
            </Button>
          </>
        )}
      </Mutation>
    </CoreModal>
  );
};

export default CreateRoomModal;
