import * as React from 'react';
import { Container } from 'constate';
import { getMyCurrentPlayingTrack } from '../../utils/spotify';

interface State {
  loggedIn: boolean;
  currentTrack: any | null;
}

const onMount = async ({ setState }: any) => {
  const data = await getMyCurrentPlayingTrack();
  console.log(data);
  setState(() => ({ currentTrack: data.item }));
};

const initialState: State = {
  loggedIn: false,
  currentTrack: null,
};

export const Home = () => (
  <Container onMount={onMount} initialState={initialState}>
    {({ loggedIn, currentTrack }) => (
      <>
        <h2>
          Current track:{' '}
          {currentTrack != null ? currentTrack.name : '... start a song'}
        </h2>
      </>
    )}
  </Container>
);
