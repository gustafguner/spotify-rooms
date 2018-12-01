import * as React from 'react';
import ActionIcon from './ActionIcon';

const Volume: React.SFC = () => (
  <ActionIcon size={18} viewBox="0 0 30 30">
    <path d="M19.18,3.42V5.09a11.25,11.25,0,0,1,0,20.09v1.67a12.77,12.77,0,0,0,0-23.43Z" />
    <path d="M19.18,10.29V20a7,7,0,0,0,0-9.69Z" />
    <polygon points="3.14 12.22 3.14 18.05 8.48 18.05 15.17 23.6 15.17 6.67 8.48 12.22 3.14 12.22" />
  </ActionIcon>
);

export default Volume;
