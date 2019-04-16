import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Svg, EmptyIcon } from 'src/components/icons';
import { DullButton } from 'src/components/buttons';

const EmptyQueueContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 15px;
  position: absolute;
`;

const EmptyQueue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  ${Svg} {
    fill: ${colors.GRAY_OFF};
    width: 48px;
    height: 48px;
  }
  & > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const EmptyQueueText = styled.p`
  color: ${colors.GRAY_OFF};
  text-align: center;
`;

interface Props {
  title: string;
  buttonTitle: string;
  onButtonClick: () => void;
}

const Empty: React.FC<Props> = ({ title, buttonTitle, onButtonClick }) => (
  <EmptyQueueContainer>
    <EmptyQueue>
      <EmptyIcon />
      <EmptyQueueText>{title} </EmptyQueueText>
      <DullButton
        onClick={() => {
          onButtonClick();
        }}
      >
        {buttonTitle}
      </DullButton>
    </EmptyQueue>
  </EmptyQueueContainer>
);

export default Empty;
