import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import Shuffle from './icons/Shuffle';
import Replay from './icons/Replay';
import Volume from './icons/Volume';
import AddToPlaylist from './icons/AddToPlaylist';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const Button = styled('button')({
  width: 34,
  height: 34,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  '&:focus': {
    outline: 'none',
  },
});

const Actions: React.SFC = () => (
  <Wrapper>
    <Button>
      <Shuffle />
    </Button>
    <Button>
      <Replay />
    </Button>
    <Button>
      <Volume />
    </Button>
    <Button>
      <AddToPlaylist />
    </Button>
  </Wrapper>
);

export default Actions;
