import { colors } from 'src/styles';
import styled from 'styled-components';

const TextInput = styled.input`
  outline: none;
  background-color: ${colors.WHITE};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.PRIMARY_GRAY};
  &::placeholder {
    color: ${colors.GRAY_OFF};
  }
  &:read-only {
    color: ${colors.GRAY_OFF};
  }
`;

const ModalTextInput = styled(TextInput)`
  width: 100%;
  padding: 16px 20px 16px 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
`;

const TextInputValidationError = styled.div`
  position: relative;
  padding: 10px 20px 0 20px;
  color: ${colors.RED};
  font-size: 14px;
`;

export { TextInput, ModalTextInput, TextInputValidationError };
