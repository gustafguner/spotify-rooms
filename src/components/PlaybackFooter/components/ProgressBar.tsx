import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import Moment from 'react-moment';
import Draggable from 'react-draggable';

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

interface TimeProps {
  position: 'left' | 'right';
}

const Time = styled(Moment)(({ position }: TimeProps) => ({
  flexBasis: 36,
  flexShrink: 0,
  fontSize: 13,
  fontWeight: 300,
  color: colors.GRAY,
  cursor: 'default',
  textAlign: position === 'left' ? 'right' : 'left',
  marginRight: position === 'left' ? 12 : 0,
  marginLeft: position === 'right' ? 12 : 0,
}));

const BarContainer = styled('div')({
  position: 'relative',
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
}));

interface KnobProps {
  hover: boolean;
}

const Knob = styled('div')(({ hover }: KnobProps) => ({
  position: 'absolute',
  width: 9,
  bottom: -3,
  left: -3,
  flexBasis: 9,
  flexShrink: 0,
  height: 9,
  borderRadius: '50%',
  backgroundColor: colors.WHITE,
  cursor: 'pointer',
  boxShadow: '0 0 5px rgba(0,0,0,0.3)',
  opacity: hover ? 1 : 0,
}));

interface ProgressBarProps {
  progress: number;
  duration: number;
  seek: (position: number) => void;
}

const ProgressBar: React.SFC<ProgressBarProps> = ({
  progress,
  duration,
  seek,
}) => {
  let width: number = 0;
  const [w, setW] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [x, setX] = useState(0);
  const [second, setSecond] = useState(progress);
  const [hover, setHover] = useState(false);

  useEffect(
    () => {
      setW(width);
    },
    [width],
  );

  const refCallback = (element: any) => {
    if (element) {
      width = element.clientWidth;
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Time position="left" format={'m:ss'}>
        {isSeeking ? second : progress}
      </Time>

      <BarContainer innerRef={refCallback}>
        <BarFill
          widthPercent={isSeeking ? (x / w) * 100 : (progress / duration) * 100}
        />
        {w !== 0 && (
          <Draggable
            position={{
              x: isSeeking ? x : Math.round((progress / duration) * w),
              y: 0,
            }}
            axis="x"
            bounds={{ left: 0, top: 0, right: w, bottom: 0 }}
            onStart={() => {
              setX(Math.round((progress / duration) * w));
              setSecond(progress);
              setIsSeeking(true);
            }}
            onDrag={(a: any, position: any) => {
              setX(position.x);
              setSecond(Math.round((position.x / w) * duration));
            }}
            onStop={(a: any, position: any) => {
              seek(Math.round((position.x / w) * duration));
              setIsSeeking(false);
            }}
          >
            <Knob hover={hover} />
          </Draggable>
        )}
      </BarContainer>

      <Time position="right" format={'m:ss'}>
        {duration}
      </Time>
    </Wrapper>
  );
};
export default ProgressBar;
