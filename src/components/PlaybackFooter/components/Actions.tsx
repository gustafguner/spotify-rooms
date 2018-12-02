import * as React from 'react';
import styled from 'react-emotion';

import { Shuffle, Repeat, Volume, AddToPlaylist } from './icons';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexFlow: 'wrap',
  paddingLeft: 5,
  paddingRight: 5,
});

const Button = styled('button')({
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

const Actions: React.SFC = () => (
  <Wrapper>
    <Button>
      <Shuffle />
    </Button>
    <Button>
      <Repeat />
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
