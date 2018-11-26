import * as React from 'react';
import { useEffect } from 'react';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { useContextState } from 'constate';

import {
  play,
  pause,
  getMyRecentlyPlayedTracks,
  getMyCurrentPlaybackState,
} from '../../utils/spotify';

import ProgressBar from './components/ProgressBar';
import TrackInfo from './components/TrackInfo';
import PlayerControls from './components/PlayerControls';

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

const playSpotify = () => {
  play();
};

const pauseSpotify = () => {
  pause();
};

const getPlayerStatus = async () => {
  const currentPlayingTrack = await getMyCurrentPlaybackState();

  const mostRecentTrack =
    JSON.stringify(currentPlayingTrack) === '""'
      ? await getMyRecentlyPlayedTracks(1)
      : null;

  const track = mostRecentTrack
    ? mostRecentTrack.items.length === 0
      ? null
      : mostRecentTrack.items[0].track
    : currentPlayingTrack.item;

  const playback = mostRecentTrack === null ? currentPlayingTrack : null;

  return { track, playback };
};

const onMount = async (setPlayer: any) => {
  const { track, playback } = await getPlayerStatus();

  setPlayer({
    track,
    playback,
  });

  const polling = async () => {
    const data = await getPlayerStatus();
    setPlayer({
      track: data.track,
      playback: data.playback,
    });
  };

  setInterval(polling, 10000);
};

const PlaybackFooter: React.SFC = () => {
  const [player, setPlayer]: any = useContextState('spotify-player', {
    track: null,
    playback: null,
  });

  useEffect(() => {
    onMount(setPlayer);
  }, []);

  return player.track !== null ? (
    <PlaybackContainer>
      <TrackInfo
        name={player.track.name}
        artists={player.track.artists}
        image={
          player.track.album.images.length !== 0
            ? player.track.album.images[0].url
            : null
        }
      />

      <Center>
        <PlayerControls play={playSpotify} pause={pauseSpotify} />
        <ProgressBar
          progress={player.playback !== null ? player.playback.progress_ms : 0}
          duration={
            player.playback !== null ? player.playback.item.duration_ms : 1
          }
        />
      </Center>

      <Right>2</Right>
    </PlaybackContainer>
  ) : (
    <>...</>
  );
};

export default PlaybackFooter;
