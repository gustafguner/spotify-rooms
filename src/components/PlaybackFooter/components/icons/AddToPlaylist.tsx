import * as React from 'react';
import ActionIcon from './ActionIcon';

const AddToPlaylist: React.SFC = () => (
  <ActionIcon size={18} viewBox="0 0 30 30">
    <rect x="0.05" y="7.28" width="17.87" height="1.5" />
    <rect x="0.05" y="13.3" width="17.87" height="1.5" />
    <rect x="0.05" y="19.31" width="11.85" height="1.5" />
    <polygon points="23.77 19.31 23.77 13.28 22.27 13.28 22.27 19.31 16.09 19.31 16.09 20.81 22.27 20.81 22.27 26.85 23.77 26.85 23.77 20.81 29.95 20.81 29.95 19.31 23.77 19.31" />
  </ActionIcon>
);

export default AddToPlaylist;
