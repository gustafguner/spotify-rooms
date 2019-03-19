import styled from 'react-emotion';
import { colors } from 'src/styles/colors';

const TextInput = styled('input')({
  outline: 'none',
  backgroundColor: colors.WHITE,
  border: 'none',
  borderRadius: 5,
  fontSize: 18,
  lineHeight: '22px',
  color: colors.PRIMARY_GRAY,
});

const ModalTextInput = styled(TextInput)({
  width: '100%',
  paddingTop: 16,
  paddingRight: 20,
  paddingBottom: 16,
  paddingLeft: 20,
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.03)',
});

export { TextInput, ModalTextInput };
