import * as React from 'react';
import { Svg, SvgProps } from 'src/components/icons/Svg';

const Play: React.SFC<SvgProps> = ({ fill, size }) => (
  <Svg fill={fill} size={size} viewBox="0 0 30 30">
    <path d="M5.14,30V0L27.8,15Z" />
  </Svg>
);

export default Play;
