import * as React from 'react';
import { colors } from 'src/styles';
import styled from 'styled-components';
import { InputProps } from './types';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

const PseudoCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled('svg')`
  width: 18px;
  height: 18px;
  fill: none;
  stroke: ${colors.GREEN};
  stroke-width: 3px;
  transition: all 0.15s;
`;

interface StyledCheckboxProps {
  checked: boolean;
}

const StyledCheckbox = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 3px;
  transition: all 150ms;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03);
  cursor: pointer;

  ${Icon} {
    opacity: ${({ checked }: StyledCheckboxProps) => (checked ? '1' : '0')};
    visibility: ${({ checked }: StyledCheckboxProps) =>
      checked ? 'visible' : 'hidden'};
    transform: ${({ checked }: StyledCheckboxProps) =>
      checked ? 'scale(1)' : 'scale(0.7)'};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  color: ${colors.GRAY_OFF};
`;

interface CheckboxProps extends InputProps {
  checked: boolean;
  label?: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  name,
  checked,
  onChange,
  onBlur,
  label,
}) => (
  <CheckboxLabel>
    <CheckboxContainer>
      <PseudoCheckbox
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    {label}
  </CheckboxLabel>
);

export { Checkbox };
