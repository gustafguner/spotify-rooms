import { colors } from '../styles';
import styled from 'react-emotion';

export const Button = styled('button')`
  background-color: ${colors.DARK_GRAY};
  color: white;
  text-decoration: none;
  padding: 10px 19px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  position: relative;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
