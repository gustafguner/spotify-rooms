import styled from 'styled-components';
import { colors } from 'src/styles/colors';
import { string } from 'prop-types';

export interface SvgProps {
  fill?: string;
  width?: number | string;
  height?: number | string;
}

export const Svg = styled.svg`
  fill: ${({ fill = colors.WHITE }: SvgProps) => fill};
  width: ${({ width = 32 }: SvgProps) => width};
  height: ${({ width = 32, height }: SvgProps) =>
    height !== null ? height : width};
`;
