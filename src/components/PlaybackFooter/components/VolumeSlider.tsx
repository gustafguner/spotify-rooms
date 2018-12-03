import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import Draggable from 'react-draggable';

interface VolumeSliderProps {
  volume: number;
  changeVolume: (volume: number) => void;
}

const Wrapper = styled('div')({
  position: 'absolute',
  backgroundColor: colors.VOLUME_BG,
  width: 'calc(100% - 15px)',
  borderRadius: 3,
  height: 125,
  top: -130,
  boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Slider = styled('div')({
  height: 100,
  width: 3,
  backgroundColor: colors.DARK_GRAY,
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'center',
});

const Knob = styled('div')({
  width: 9,
  flexBasis: 9,
  flexShrink: 0,
  height: 9,
  borderRadius: '50%',
  backgroundColor: colors.WHITE,
  cursor: 'pointer',
});

const VolumeSlider: React.SFC<VolumeSliderProps> = ({
  volume,
  changeVolume,
}) => (
  <Wrapper>
    <Slider>
      <Draggable
        defaultPosition={{ x: 0, y: 100 - volume }}
        axis="y"
        bounds={{ left: 0, top: 0, right: 0, bottom: 100 }}
        onStop={(e: any, position: any) => {
          changeVolume(100 - position.y);
        }}
      >
        <Knob />
      </Draggable>
    </Slider>
  </Wrapper>
);
export default VolumeSlider;
