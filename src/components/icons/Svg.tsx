import styled from 'react-emotion';

export interface SvgProps {
  fill?: string;
  size?: number | string;
}

export const Svg = styled('svg')(({ fill = '#fff', size = 32 }: SvgProps) => ({
  fill,
  width: size,
  height: size,
}));
