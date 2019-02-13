import { colors } from 'src/styles';
import styled from 'react-emotion';

const Button = styled('button')({
  backgroundColor: colors.GRAY,
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
  borderRadius: 40,
  ':focus': {
    outline: 'none',
  },
});

const LargeButton = styled(Button)({
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 30,
  paddingRight: 30,
  fontSize: 18,
});

export { Button, LargeButton };
