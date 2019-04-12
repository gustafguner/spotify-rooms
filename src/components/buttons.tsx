import { colors } from 'src/styles';
import styled from 'styled-components';
import * as color from 'color';

const Button = styled.button`
  background-color: ${colors.GRAY};
  color: ${colors.WHITE};
  text-decoration: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 19px;
  padding-right: 19px;
  display: flex;
  align-items: center;
  position: relative;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 40px;
  white-space: nowrap;
  ':focus': {
    outline: none;
  }
`;

const GreenButton = styled(Button)`
  background-color: ${colors.GREEN};
  &:hover {
    background-color: ${color(colors.GREEN)
      .darken(0.1)
      .string()};
  }
`;

const LargeButton = styled(Button)`
  padding: 16px 30px 16px 30px;
  font-size: 18px;
`;

const DullButton = styled(Button)`
  background: ${colors.PRIMARY_GRAY_LIGHTER};
  padding-top: 9px;
  padding-bottom: 9px;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.09);
  &:hover {
    background: ${color(colors.PRIMARY_GRAY_LIGHTER)
      .lighten(0.1)
      .string()};
  }
`;

export { Button, GreenButton, LargeButton, DullButton };
