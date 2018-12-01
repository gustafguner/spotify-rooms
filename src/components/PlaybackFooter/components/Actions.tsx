import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import Shuffle from './icons/Shuffle';

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
  <>
    <Button>
      <Shuffle />
    </Button>
  </>
);

export default Actions;
