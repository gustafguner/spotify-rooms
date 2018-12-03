import * as React from 'react';
import styled from 'react-emotion';
import OutsideClickHandler from 'react-outside-click-handler';

import { Shuffle, Repeat, Volume, AddToPlaylist } from './icons';
import VolumeSlider from './VolumeSlider';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexFlow: 'wrap',
  paddingLeft: 5,
  paddingRight: 5,
});

const VolumeWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

const Button = styled('button')({
  position: 'relative',
  width: 34,
  height: 34,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  marginLeft: 5,
  marginRight: 5,
  '&:focus': {
    outline: 'none',
  },
});

interface ActionsProps {
  shuffle: boolean;
  toggleShuffle: () => void;
  repeat: boolean;
  toggleRepeat: () => void;
  volume: number;
  volumeToggled: boolean;
  toggleVolume: () => void;
  changeVolume: (volume: number) => void;
}

const Actions: React.SFC<ActionsProps> = ({
  shuffle,
  toggleShuffle,
  repeat,
  toggleRepeat,
  volume,
  volumeToggled,
  changeVolume,
  toggleVolume,
}) => (
  <Wrapper>
    <Button onClick={toggleShuffle}>
      <Shuffle toggled={shuffle} />
    </Button>
    <Button onClick={toggleRepeat}>
      <Repeat toggled={repeat} />
    </Button>

    <OutsideClickHandler onOutsideClick={toggleVolume}>
      <VolumeWrapper>
        {volumeToggled && (
          <VolumeSlider volume={volume} changeVolume={changeVolume} />
        )}

        <Button onClick={toggleVolume}>
          <Volume />
        </Button>
      </VolumeWrapper>
    </OutsideClickHandler>

    <Button>
      <AddToPlaylist />
    </Button>
  </Wrapper>
);

export default Actions;
