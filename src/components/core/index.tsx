import styled from 'styled-components';

interface SpacingProps {
  width?: number;
  height?: number;
}

const Spacing = styled.div`
  width: ${({ width }: SpacingProps) => width}px;
  height: ${({ height }: SpacingProps) => height}px;
`;

export { Spacing };
