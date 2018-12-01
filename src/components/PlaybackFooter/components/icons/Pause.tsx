import * as React from 'react';
import { Svg, SvgProps } from 'src/components/icons/Svg';

const Pause: React.SFC<SvgProps> = ({ fill, size }) => (
  <Svg fill={fill} size={size} viewBox="0 0 30 30">
    <path d="M10.08,0V30H4.42V0Z" />
    <path d="M25.58,0V30H19.92V0Z" />
  </Svg>
);

export default Pause;
