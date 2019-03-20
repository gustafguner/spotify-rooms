import { colors } from 'src/styles';
import styled from 'styled-components';

const Button = styled.button`
  background-color: colors.GRAY;
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
  ':focus': {
    outline: none;
  }
`;

const LargeButton = styled(Button)`
  padding: 16px 30px 16px 30px;
  font-size: 18px;
`;

export { Button, LargeButton };
