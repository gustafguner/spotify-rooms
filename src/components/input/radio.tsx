import * as React from 'react';
import { colors } from 'src/styles';
import styled from 'styled-components';
import { InputProps } from './types';
import { v4 as uuid } from 'uuid';

interface KnobProps {
  left: number;
}

const Knob = styled.div`
  position: absolute;
  top: -1px;
  width: 50%;
  border-radius: 40px;
  height: calc(100% + 2px);
  background: ${colors.WHITE}
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  transform: ${({ left }: KnobProps) => `translateX(${left}%)`};
`;

const Field = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  border-radius: 40px;
  display: flex;
  flex-flow: row;
  background: rgb(240, 240, 240);
  input {
    display: none;
  }
  label {
    width: 100%;
    color: ${colors.GRAY};
    text-align: center;
    position: relative;
    line-height: 40px;
    cursor: pointer;
  }
  input:checked + label {
    color: ${colors.PRIMARY_GRAY};
  }
`;

interface SliderField {
  value: string;
  label: string;
  id: string;
}

interface ToggleProps {
  name: string;
  selected: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void);
  fields: SliderField[];
}

const Toggle: React.SFC<ToggleProps> = ({
  name,
  selected,
  onChange,
  onBlur,
  fields,
}) => (
  <SliderContainer>
    <Knob
      left={
        fields.findIndex((field: SliderField) => selected === field.value) * 100
      }
    />
    {fields.map((field: SliderField) => (
      <Field key={uuid()}>
        <input
          type="radio"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={field.value}
          checked={selected === field.value}
          id={field.id}
        />
        <label htmlFor={field.id}>{field.label}</label>
      </Field>
    ))}
  </SliderContainer>
);
export { Toggle };
