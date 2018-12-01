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
  borderRadius: '50%',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  '&:focus': {
    outline: 'none',
  },
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
      <Previous size={34} />
    </Button>
    {isPlaying ? (
      <Button onClick={pause}>
        <Pause size={34} />
      </Button>
    ) : (
      <Button onClick={play}>
        <Play size={34} />
      </Button>
    )}
    <Button onClick={next}>
      <Next size={34} />
    </Button>
  </Wrapper>
);

export default PlayerControls;
