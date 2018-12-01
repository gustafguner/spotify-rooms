import * as React from 'react';
import styled from 'react-emotion';

import Play from './icons/Play';
import Pause from './icons/Pause';
import Previous from './icons/Previous';
import Next from './icons/Next';

interface PlayerControlsProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  previous: () => void;
  next: () => void;
}

const Wrapper = styled('div')({
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Button = styled('button')({
  width: 34,
  height: 34,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  '&:focus': {
    outline: 'none',
  },
});

const PlayPauseButton = styled(Button)({
  marginLeft: 10,
  marginRight: 10,
});

const PlayerControls: React.SFC<PlayerControlsProps> = ({
  isPlaying,
  play,
  pause,
  previous,
  next,
}) => (
  <Wrapper>
    <Button onClick={previous}>
      <Previous />
    </Button>
    {isPlaying ? (
      <PlayPauseButton onClick={pause}>
        <Pause />
      </PlayPauseButton>
    ) : (
      <PlayPauseButton onClick={play}>
        <Play />
      </PlayPauseButton>
    )}
    <Button onClick={next}>
      <Next />
    </Button>
  </Wrapper>
);

export default PlayerControls;
