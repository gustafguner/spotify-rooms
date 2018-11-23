import * as React from 'react';
import { Container, EffectMap, EffectProps } from 'constate';
import styled from 'react-emotion';
import { colors } from '../../styles';
import {
  getMyCurrentPlayingTrack,
  play,
  pause,
  getMyRecentlyPlayedTracks,
} from '../../utils/spotify';

import ProgressBar from './components/ProgressBar';
import TrackInfo from './components/TrackInfo';
import PlayerControls from './components/PlayerControls';

interface State {
  track?: any;
  playStatus?: any;
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
  const currentPlayingTrack = await getMyCurrentPlayingTrack();
  const mostRecentTrack =
    JSON.stringify(currentPlayingTrack) === '""'
      ? await getMyRecentlyPlayedTracks(1)
      : null;

  const track = mostRecentTrack
    ? mostRecentTrack.items.length === 0
      ? null
      : mostRecentTrack.items[0].track
    : currentPlayingTrack.item;

  console.log(currentPlayingTrack);

  setState(() => ({
    playStatus: mostRecentTrack === null ? currentPlayingTrack : null,
    track,
  }));

  const fn = async () => {
    const data = await getMyCurrentPlayingTrack();
    setState(() => ({ playStatus: data }));
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
    {({ track = null, playStatus = null, playSpotify, pauseSpotify }) =>
      track !== null ? (
        <PlaybackContainer>
          <TrackInfo
            name={track.name}
            artists={track.artists}
            image={
              track.album.images.length !== 0 ? track.album.images[0].url : null
            }
          />

          {playStatus.item.duration_ms}
          <Center>
            <PlayerControls play={playSpotify} pause={pauseSpotify} />
            <ProgressBar
              progress={playStatus !== null ? playStatus.progress_ms : 0}
              duration={playStatus !== null ? playStatus.item.duration_ms : 1}
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
