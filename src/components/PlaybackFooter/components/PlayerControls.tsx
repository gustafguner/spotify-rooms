import * as React from 'react';

interface PlayerControlsProps {
  play: () => void;
  pause: () => void;
}

const PlayerControls: React.SFC<PlayerControlsProps> = ({ play, pause }) => (
  <>
    <button onClick={play}>Play</button>
    <button onClick={pause}>Pause</button>
  </>
);

export default PlayerControls;
