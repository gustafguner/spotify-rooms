import * as React from 'react';
import PlaybackIcon from './PlaybackIcon';

const Next: React.SFC = () => (
  <PlaybackIcon size={16} viewBox="0 0 30 30">
    <rect
      x="23.04"
      y="3.17"
      width="3.8"
      height="23.67"
      transform="translate(49.89 30) rotate(-180)"
    />

    <polygon points="3.15 2.87 21.49 15 3.15 27.14 3.15 2.87" />
  </PlaybackIcon>
);

export default Next;
