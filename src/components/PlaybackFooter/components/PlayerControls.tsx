import * as React from 'react';
import styled from 'react-emotion';

import PlayIcon from './icons/Play';

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
    <Button onClick={previous}>{'<'}</Button>
    {isPlaying ? (
      <Button onClick={pause}>Pause</Button>
    ) : (
      <Button onClick={play}>
        <PlayIcon />
      </Button>
    )}
    <Button onClick={next}>-></Button>
  </Wrapper>
);

export default PlayerControls;
