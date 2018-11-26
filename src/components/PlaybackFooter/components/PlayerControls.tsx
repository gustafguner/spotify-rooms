import * as React from 'react';
import styled from 'react-emotion';

interface PlayerControlsProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

const Wrapper = styled('div')({
  height: 50,
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Button = styled('button')({
  width: 42,
  height: 42,
  borderRadius: '50%',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none',
  },
});

const PlayerControls: React.SFC<PlayerControlsProps> = ({
  isPlaying,
  play,
  pause,
}) => (
  <Wrapper>
    {isPlaying ? (
      <Button onClick={pause}>Pause</Button>
    ) : (
      <Button onClick={play}>Play</Button>
    )}
  </Wrapper>
);

export default PlayerControls;
