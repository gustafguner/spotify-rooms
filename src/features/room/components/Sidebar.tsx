import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Queue } from './Queue';

const Container = styled('div')({
  width: 350,
  flexBasis: 350,
  flexShrink: 0,
  height: 'calc(100vh - 90px - 70px)',
  backgroundColor: colors.ALMOST_BLACK,
  boxShadow: '-2px 0 18px rgba(0,0,0,0.2)',
  position: 'relative',
  display: 'flex',
  flexFlow: 'column',
});

const AddToQueue = styled('div')({
  width: '100%',
  flexBasis: 120,
  flexShrink: 0,
  height: 120,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexFlow: 'column',
  backgroundColor: colors.DARK_BG,
});

const AddToQueueButton = styled(Button)({
  marginBottom: 8,
});

const Text = styled('p')({
  fontSize: 14,
  flexBasis: 20,
  flexShrink: 0,
  textAlign: 'center',
});

const MUTATION = gql`
  mutation addTrackToQueue($input: AddTrackToQueueInput!) {
    addTrackToQueue(input: $input)
  }
`;

interface SidebarProps {
  room: any;
}

const Sidebar: React.SFC<SidebarProps> = ({ room }) => (
  <Container>
    <Queue queue={room.queue} />
    <AddToQueue>
      <Mutation mutation={MUTATION}>
        {(mutate) => (
          <>
            <AddToQueueButton
              onClick={() => {
                mutate({
                  variables: {
                    input: {
                      roomId: room.id,
                      trackId: '1ntxpzIUbSsizvuAy6lTYY',
                    },
                  },
                });
              }}
            >
              Add
            </AddToQueueButton>
            <Text>Add your song to the queue 👋</Text>
          </>
        )}
      </Mutation>
    </AddToQueue>
  </Container>
);

export { Sidebar };
