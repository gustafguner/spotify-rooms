import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles/colors';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void);
  value?: string | number | string[];
}

const TextInput = styled.input`
  outline: none;
  background-color: ${colors.WHITE};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  color: ${colors.PRIMARY_GRAY};
`;

const ModalTextInput = styled(TextInput)`
  width: 100%;
  padding: 16px 20px 16px 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const PseudoCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1;
  margin: -1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  whitespace: nowrap;
  width: 1;
`;

const Icon = styled('svg')`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: StyledCheckboxProps) =>
    props.checked ? 'salmon' : 'papayawhip'};
  border-radius: 3px;
  transition: all 150ms;

  ${PseudoCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props: StyledCheckboxProps) =>
      props.checked ? 'visible' : 'hidden'};
  }
`;

interface CheckboxProps extends Props {
  checked: boolean;
}

const Checkbox: React.SFC<CheckboxProps> = ({
  checked,
  onChange,
  onBlur,
  value,
}) => (
  <CheckboxContainer>
    <PseudoCheckbox
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export { TextInput, ModalTextInput, Checkbox };
