import styled from 'react-emotion';
import { colors } from 'src/styles/colors';

export interface SvgProps {
  fill?: string;
  size?: number | string;
}

export const Svg = styled('svg')(
  ({ fill = colors.WHITE, size = 32 }: SvgProps) => ({
    fill,
    width: size,
    height: size,
  }),
);
