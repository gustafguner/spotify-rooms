import * as React from 'react';
import { colors } from 'src/styles';
import styled from 'styled-components';
import { InputProps } from './types';

interface RadioButtonProps extends InputProps {
  checked: boolean;
}

const RadioButton: React.SFC<RadioButtonProps> = ({
  name,
  onBlur,
  onChange,
  value,
  checked,
}) => (
  <input
    type="radio"
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    checked={checked}
  />
);

interface SliderField {
  value: string;
  label: string;
}

interface SliderProps {
  name: string;
  selected: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void);
  fields: SliderField[];
}

const Slider: React.SFC<SliderProps> = ({
  name,
  selected,
  onChange,
  onBlur,
  fields,
}) => (
  <>
    {fields.map((field: SliderField) => (
      <input
        type="radio"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={field.value}
        checked={selected === field.value}
      />
    ))}
  </>
);
export { Slider };
