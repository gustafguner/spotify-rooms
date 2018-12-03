import { colors } from '../styles';
import styled from 'react-emotion';

export const Button = styled('button')({
  backgroundColor: colors.DARK_GRAY,
  color: colors.WHITE,
  textDecoration: 'none',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 19,
  paddingRight: 19,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: 'none',
  outline: 'none',
  fontSize: 16,
  cursor: 'pointer',
  ':focus': {
    outline: 'none',
  },
});
