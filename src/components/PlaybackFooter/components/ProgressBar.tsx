import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';

interface ProgressBarProps {
  progress: number;
  duration: number;
}

const BarContainer = styled('div')`
  width: 100%;
  height: 4px;
  border-radius: 10px;
  background-color: ${colors.DARK_GRAY};
`;

interface BarFillProps {
  widthPercent: number;
}

const BarFill = styled('div')(({ widthPercent }: BarFillProps) => ({
  width: widthPercent + '%',
  height: '100%',
  borderRadius: '10px',
  backgroundColor: colors.WHITE,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: colors.WHITE,
    borderRadius: '50%',
    right: 0,
    bottom: '-2px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  },
}));

const ProgressBar: React.SFC<ProgressBarProps> = ({ progress, duration }) => (
  <>
    <BarContainer>
      <BarFill widthPercent={(progress / duration) * 100} />
    </BarContainer>
  </>
);

export default ProgressBar;
