import * as React from 'react';
import { Svg, SvgProps } from 'src/components/icons/Svg';

const Pause: React.SFC<SvgProps> = ({ fill, size }) => (
  <Svg fill={fill} size={size} viewBox="0 0 30 30">
    <rect x="19" y="3.1" width="3.8" height="23.7" />
    <rect x="7.2" y="3.1" width="3.8" height="23.7" />
  </Svg>
);

export default Pause;
