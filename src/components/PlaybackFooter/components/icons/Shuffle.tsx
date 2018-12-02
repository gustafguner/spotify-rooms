import * as React from 'react';
import ActionIcon from './ActionIcon';

interface ShuffleProps {
  toggled?: boolean;
}

const Shuffle: React.SFC<ShuffleProps> = ({ toggled }) => (
  <ActionIcon toggled={toggled} viewBox="0 0 30 30">
    <polygon points="18.55 17.23 17.5 18.29 22.34 23.14 19.65 25.83 26.09 25.83 26.09 19.39 23.4 22.08 18.55 17.23" />
    <rect
      x="7.67"
      y="2.52"
      width="1.5"
      height="11.27"
      transform="translate(-3.3 8.34) rotate(-45)"
    />
    <polygon points="26.09 10.62 26.09 4.17 19.65 4.17 22.34 6.86 3.91 25.3 4.97 26.36 23.4 7.92 26.09 10.62" />
  </ActionIcon>
);

export default Shuffle;
