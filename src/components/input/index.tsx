import { TextInput, ModalTextInput, TextInputValidationError } from './text';
import { Checkbox } from './checkbox';
import { Toggle } from './radio';
import styled from 'styled-components';
import { colors } from 'src/styles';

const InputTitle = styled.div`
  padding: 0 0 10px 0;
  color: ${colors.GRAY_OFF};
  font-size: 14px;
`;

const InputInformation = styled.div`
  padding: 10px 20px 0 0;
  color: ${colors.GRAY};
  font-size: 14px;
`;

export {
  TextInput,
  ModalTextInput,
  TextInputValidationError,
  InputInformation,
  InputTitle,
  Checkbox,
  Toggle,
};
