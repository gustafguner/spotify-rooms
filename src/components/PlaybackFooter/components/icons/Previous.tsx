import * as React from 'react';
import { Svg, SvgProps } from 'src/components/icons/Svg';

const Previous: React.SFC<SvgProps> = ({ fill, size }) => (
  <Svg fill={fill} size={size} viewBox="0 0 30 30">
    <rect x="3.15" y="3.17" width="3.8" height="23.67" />
    <polygon points="26.85 27.14 8.51 15 26.85 2.87 26.85 27.14" />
  </Svg>
);

export default Previous;
