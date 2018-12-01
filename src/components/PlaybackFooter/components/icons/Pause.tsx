import * as React from 'react';
import PlaybackIcon from './PlaybackIcon';

const Pause: React.SFC = () => (
  <PlaybackIcon size={24} viewBox="0 0 30 30">
    <path d="M10.08,0V30H4.42V0Z" />
    <path d="M25.58,0V30H19.92V0Z" />
  </PlaybackIcon>
);

export default Pause;
