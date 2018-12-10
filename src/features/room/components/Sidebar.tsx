import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled('div')({
  width: 300,
  flexBasis: 300,
  flexShrink: 0,
  height: 'calc(100vh - 90px - 70px)',
  backgroundColor: colors.ALMOST_BLACK,
  boxShadow: '-2px 0 18px rgba(0,0,0,0.2)',
  position: 'relative',
  display: 'flex',
  flexFlow: 'column',
});

const Queue = styled('div')({
  width: '100%',
  flexBasis: '100%',
  height: '100%',
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

const Sidebar: React.SFC = () => (
  <Container>
    <Queue>a</Queue>
    <AddToQueue>
      <Mutation mutation={MUTATION}>
        {(mutate) => (
          <>
            <AddToQueueButton
              onClick={() => {
                mutate({
                  variables: {
                    input: {
                      trackId: '0ud7ma9G6buYyqfaeGRG4Y',
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
