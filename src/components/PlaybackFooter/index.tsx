import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../styles';
import { useContextState } from 'constate';
import { useEffect } from 'react';
import {
  play,
  pause,
  previous,
  next,
  getMyCurrentPlaybackState,
  getMyRecentlyPlayedTracks,
} from '../../utils/spotify';

import ProgressBar from './components/ProgressBar';
import TrackInfo from './components/TrackInfo';
import PlayerControls from './components/PlayerControls';

const PlaybackContainer = styled('div')({
  width: '100%',
  height: 90,
  backgroundColor: colors.PRIMARY_DARK,
  position: 'fixed',
  bottom: 0,
  left: 0,
  paddingTop: 20,
  paddingBottom: 20,
  display: 'flex',
  alignItems: 'center',
});

const Center = styled('div')({
  flexBasis: '60%',
  flexGrow: 0,
  paddingLeft: 20,
  paddingRight: 20,
});

const Right = styled('div')({
  display: 'flex',
  flexBasis: '30%',
  minWidth: 180,
  flexGrow: 0,
  flexShrink: 0,
});

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

const updatePlayer = async (setPlayer: any) => {
  const { track, playback } = await getPlayerStatus();

  setPlayer({
    track,
    playback,
  });
};

const PlaybackFooter = () => {
  const [player, setPlayer] = useContextState('spotify');

  useEffect(() => {
    updatePlayer(setPlayer);

    const polling = setInterval(() => {
      updatePlayer(setPlayer);
    }, 3000);

    const interval = setInterval(() => {
      setPlayer((p: any) => {
        return {
          track: p.track,
          playback: {
            ...p.playback,
            progress_ms:
              p.playback !== null
                ? p.playback.is_playing
                  ? p.playback.progress_ms + 100
                  : p.playback.progress_ms
                : 0,
          },
        };
      });
    }, 100);
    return () => {
      clearInterval(polling);
      clearInterval(interval);
    };
  }, []);

  const playSpotify = async () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        is_playing: true,
      },
    }));
    play();
  };

  const pauseSpotify = async () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        is_playing: false,
      },
    }));
    pause();
  };

  const previousSpotify = async () => {
    previous();
    updatePlayer(setPlayer);
  };

  const nextSpotify = async () => {
    next();
    updatePlayer(setPlayer);
  };

  return player && player.track !== null ? (
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
        <PlayerControls
          isPlaying={player.playback.is_playing || false}
          play={playSpotify}
          pause={pauseSpotify}
          previous={previousSpotify}
          next={nextSpotify}
        />
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
