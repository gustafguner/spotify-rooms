import styled from 'react-emotion';
import { colors } from 'src/styles/colors';
import { string } from 'prop-types';

export interface SvgProps {
  fill?: string;
  width?: number | string;
  height?: number | string;
}

export const Svg = styled('svg')(
  ({ fill = colors.WHITE, width = 32, height }: SvgProps) => ({
    fill,
    width,
    height: height !== null ? height : width,
  }),
);
