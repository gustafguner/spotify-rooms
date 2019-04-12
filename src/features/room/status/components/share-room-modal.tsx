import * as React from 'react';
import styled from 'styled-components';
import { CoreModal } from 'src/components/CoreModal';
import { ModalTextInput, InputInformation } from 'src/components/input';
import { Button } from 'src/components/buttons';
import { ModalParagraph, ModalSubtitle } from 'src/components/text';
import { colors } from 'src/styles';
import { Spacing } from 'src/components/core';
import { withRouter } from 'react-router';
import * as copy from 'copy-to-clipboard';

const Modal = styled(CoreModal)``;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
`;

const Title = styled(ModalSubtitle)`
  margin-bottom: 10px;
`;

const Paragraph = styled(ModalParagraph)`
  margin-bottom: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row;
`;

const CopyButton = styled(Button)`
  background: ${colors.GREEN};
`;

const modalStyles = {
  modal: {
    width: 600,
    height: 'auto',
  },
};

interface Props {
  isOpen: boolean;
  close: () => void;
  match: any;
  location: any;
  history: any;
}

const ShareRoomModal: React.FC<Props> = ({ isOpen, close, location }) => {
  console.log(location);
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <Title>Share with others</Title>
        <Paragraph>Make the room crowded! 💃</Paragraph>

        <ModalTextInput
          value={`${window.location.origin}${location.pathname}`}
          onChange={() => {}}
          readOnly={true}
        />

        <InputInformation>
          Invite people to the room by giving them this URL
        </InputInformation>

        <Spacing height={25} />
        <ButtonContainer>
          <CopyButton
            onClick={() => {
              copy(`${window.location.origin}${location.pathname}`);
            }}
          >
            Copy link
          </CopyButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default withRouter(ShareRoomModal);
