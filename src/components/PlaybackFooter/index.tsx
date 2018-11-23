import * as React from 'react';
import { Container, EffectMap, EffectProps } from 'constate';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { getMyCurrentPlayingTrack, play, pause } from '../../utils/spotify';

import ProgressBar from './components/ProgressBar';
import TrackInfo from './components/TrackInfo';

interface State {
  loggedIn: boolean;
  playerStatus?: any;
  spotifyPoll?: any;
}

interface Effects {
  playSpotify: () => void;
  pauseSpotify: () => void;
}

const effects: EffectMap<State, Effects> = {
  playSpotify: () => ({ setState }: EffectProps<State>) => {
    play();
  },
  pauseSpotify: () => ({ setState }: EffectProps<State>) => {
    pause();
  },
};

const onMount = async ({ setState }: any) => {
  const initialData = await getMyCurrentPlayingTrack();
  console.log(initialData);
  setState(() => ({ playerStatus: initialData }));

  const fn = async () => {
    const data = await getMyCurrentPlayingTrack();
    setState(() => ({ playerStatus: data }));
  };
  setInterval(fn, 10000);
};

const PlaybackContainer = styled('div')`
  width: 100%;
  height: 85px;
  background-color: ${colors.PRIMARY_DARK};
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;

const Center = styled('div')`
  flex-basis: 60%;
  flex-grow: 0;
  padding: 0 20px;
`;

const Right = styled('div')`
  display: flex;
  flex-basis: 30%;
  min-width: 180px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const PlaybackFooter: React.SFC = () => (
  <Container effects={effects} onMount={onMount}>
    {({ loggedIn, playerStatus, playSpotify, pauseSpotify }) =>
      playerStatus != null ? (
        <PlaybackContainer>
          <TrackInfo track={playerStatus.item} />

          <Center>
            <button onClick={playSpotify}>Play</button>
            <button onClick={pauseSpotify}>Pause</button>
            <ProgressBar
              progress={playerStatus.progress_ms}
              duration={playerStatus.item.duration_ms}
            />
          </Center>

          <Right>2</Right>
        </PlaybackContainer>
      ) : (
        <div>...</div>
      )
    }
  </Container>
);

export default PlaybackFooter;
