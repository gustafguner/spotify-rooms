import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import Moment from 'react-moment';

interface ProgressBarProps {
  progress: number;
  duration: number;
}

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

interface TimeProps {
  position: 'left' | 'right';
}

const Time = styled(Moment)(({ position }: TimeProps) => ({
  fontSize: 13,
  fontWeight: 300,
  color: colors.GRAY,
  cursor: 'default',
  marginRight: position === 'left' ? 12 : 0,
  marginLeft: position === 'right' ? 12 : 0,
}));

const BarContainer = styled('div')({
  width: '100%',
  height: 3,
  borderRadius: 10,
  backgroundColor: colors.DARK_GRAY,
});

interface BarFillProps {
  widthPercent: number;
}

const BarFill = styled('div')(({ widthPercent }: BarFillProps) => ({
  width: widthPercent + '%',
  height: '100%',
  borderRadius: '10px',
  backgroundColor: colors.WHITE,
  position: 'relative',
  ':hover': {
    '::after': {
      display: 'block',
    },
  },
  '::after': {
    content: '""',
    position: 'absolute',
    width: '9px',
    height: '9px',
    backgroundColor: colors.WHITE,
    borderRadius: '50%',
    right: '-4px',
    bottom: '-3px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    display: 'none',
  },
}));

const ProgressBar: React.SFC<ProgressBarProps> = ({ progress, duration }) => (
  <Wrapper>
    <Time position="left" format={'mm:ss'}>
      {progress}
    </Time>
    <BarContainer>
      <BarFill widthPercent={(progress / duration) * 100} />
    </BarContainer>
    <Time position="right" format={'mm:ss'}>
      {duration}
    </Time>
  </Wrapper>
);

export default ProgressBar;
