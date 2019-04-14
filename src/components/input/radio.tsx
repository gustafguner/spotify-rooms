import * as React from 'react';
import { colors } from 'src/styles';
import styled from 'styled-components';
import { InputProps } from './types';
import { v4 as uuid } from 'uuid';
import { Svg } from '../icons';
import * as color from 'color';

type SliderTheme = 'light' | 'dark';

interface KnobProps {
  left: number;
  theme: SliderTheme;
}

const Knob = styled.div`
  position: absolute;
  top: -1px;
  width: 50%;
  border-radius: 40px;
  height: calc(100% + 2px);
  background: ${({ theme }: KnobProps) =>
    theme === 'light'
      ? colors.WHITE
      : color(colors.PRIMARY_GRAY)
          .lighten(0.2)
          .string()};
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

interface SliderProps {
  theme: SliderTheme;
}

const SliderContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  border-radius: 40px;
  display: flex;
  flex-flow: row;
  background: rgb(240, 240, 240);
  background: ${({ theme }: SliderProps) =>
    theme === 'light' ? 'rgb(240, 240, 240)' : colors.PRIMARY_GRAY};
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
    display: flex;
    justify-content: center;
    align-items: center;
    ${Svg} {
      overflow: visible;
      fill: ${colors.GRAY};
      stroke: ${colors.GRAY};
      stroke-width: 0.2px;
      margin-left: 7px;
      width: 28px;
      height: 28px;
    }
  }
  input:checked + label {
    color: ${({ theme }: SliderProps) =>
      theme === 'light' ? colors.PRIMARY_GRAY : colors.ALMOST_WHITE};
    ${Svg} {
      fill: ${colors.GREEN};
      stroke: ${colors.GREEN};
    }
  }
`;

interface SliderField {
  value: string;
  label: string;
  id: string;
  icon?: any;
}

interface ToggleProps {
  name: string;
  selected: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  fields: SliderField[];
  theme?: SliderTheme;
}

const Toggle: React.FC<ToggleProps> = ({
  name,
  selected,
  onChange,
  onBlur,
  fields,
  theme = 'light',
}) => (
  <SliderContainer theme={theme}>
    <Knob
      theme={theme}
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
        <label htmlFor={field.id}>
          <div>{field.label}</div>
          {field.icon}
        </label>
      </Field>
    ))}
  </SliderContainer>
);
export { Toggle };
