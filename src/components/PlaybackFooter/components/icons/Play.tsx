import * as React from 'react';
import { Svg, SvgProps } from 'src/components/icons/Svg';

const Play: React.SFC<SvgProps> = ({ fill, size }) => (
  <Svg fill={fill} size={size} viewBox="0 0 65 65">
    <polygon points="18.7,54.9 18.7,10 52.7,32.5" />
  </Svg>
);

export default Play;
