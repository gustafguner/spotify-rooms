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
  setShuffle,
  setRepeat,
  setVolume,
  seek,
} from '../../utils/spotify';

import ProgressBar from './components/ProgressBar';
import TrackInfo from './components/TrackInfo';
import PlayerControls from './components/PlayerControls';
import Actions from './components/Actions';

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

const Left = styled('div')({
  display: 'flex',
  flexBasis: '30%',
  minWidth: 180,
  flexGrow: 0,
  flexShrink: 0,
  alignItems: 'center',
});

const Center = styled('div')({
  flexBasis: '60%',
  flexGrow: 0,
  paddingLeft: 25,
  paddingRight: 25,
});

const Right = styled('div')({
  display: 'flex',
  flexBasis: '30%',
  paddingLeft: 20,
  paddingRight: 20,
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

const PlaybackFooter = () => {
  const [player, setPlayer] = useContextState('spotify');
  const [auth] = useContextState('auth');

  const updatePlayer = async () => {
    const { track, playback } = await getPlayerStatus();

    setPlayer((p: any) => ({
      track,
      playback,
      actions: p.actions,
    }));
  };

  useEffect(() => {
    updatePlayer();

    const polling = setInterval(() => {
      updatePlayer();
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
                  ? p.playback.progress_ms + 1000
                  : p.playback.progress_ms
                : 0,
          },
          actions: p.actions,
        };
      });
    }, 1000);

    return () => {
      clearInterval(polling);
      clearInterval(interval);
    };
  }, []);

  useEffect(
    () => {
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    },
    [player],
  );

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      playOrPauseSpotify();
    }
  };

  const playOrPauseSpotify = async () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        is_playing: !p.playback.is_playing,
      },
    }));

    player.playback.is_playing ? pause() : play();
  };

  const previousSpotify = async () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        progress_ms: 0,
      },
    }));
    previous();
    updatePlayer();
  };

  const nextSpotify = async () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        progress_ms: 0,
      },
    }));
    next();
    updatePlayer();
  };

  const toggleVolume = () => {
    setPlayer((p: any) => ({
      ...p,
      actions: {
        ...p.actions,
        volumeToggled: !p.actions.volumeToggled,
      },
    }));
  };

  const changeSpotifyVolume = (volume: number) => {
    setVolume(volume);
  };

  const toggleShuffle = () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        shuffle_state: !player.playback.shuffle_state,
      },
    }));
    setShuffle(player.playback.shuffle_state);
  };

  const toggleRepeat = () => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        repeat_state: player.playback.repeat_state === 'off' ? 'track' : 'off',
      },
    }));
    setRepeat(player.playback.repeat_state === 'off');
  };

  const seekSpotify = (position: number) => {
    setPlayer((p: any) => ({
      ...p,
      playback: {
        ...p.playback,
        progress_ms: position,
      },
    }));
    seek(position);
  };

  return auth && auth.loggedIn && player && player.track !== null ? (
    <PlaybackContainer>
      <Left>
        <TrackInfo
          name={player.track.name}
          artists={player.track.artists}
          image={
            player.track.album.images.length !== 0
              ? player.track.album.images[0].url
              : null
          }
        />
      </Left>

      <Center>
        <PlayerControls
          isPlaying={player.playback.is_playing || false}
          playOrPause={playOrPauseSpotify}
          previous={previousSpotify}
          next={nextSpotify}
        />
        <ProgressBar
          progress={player.playback !== null ? player.playback.progress_ms : 0}
          duration={
            player.playback !== null ? player.playback.item.duration_ms : 1
          }
          seek={seekSpotify}
        />
      </Center>

      <Right>
        <Actions
          shuffle={player.playback.shuffle_state}
          toggleShuffle={toggleShuffle}
          repeat={player.playback.repeat_state !== 'off'}
          toggleRepeat={toggleRepeat}
          volume={player.playback.device.volume_percent}
          volumeToggled={player.actions.volumeToggled}
          changeVolume={changeSpotifyVolume}
          toggleVolume={toggleVolume}
        />
      </Right>
    </PlaybackContainer>
  ) : (
    <>...</>
  );
};

export default PlaybackFooter;
