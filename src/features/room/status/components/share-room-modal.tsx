import * as React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import CoreModal from 'src/components/CoreModal';
import {
  Checkbox,
  ModalTextInput,
  TextInputValidationError,
  InputInformation,
  InputTitle,
  Toggle,
} from 'src/components/input';
import gql from 'graphql-tag';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import { ModalParagraph, ModalSubtitle } from 'src/components/text';
import { colors } from 'src/styles';
import { Svg, CoopIcon, DjIcon } from 'src/components/icons';
import { Spacing } from 'src/components/core';
import { withRouter } from 'react-router';

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
    }
  }
`;

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
  margin-bottom: 10px;
`;

const modalStyles = {
  modal: {
    width: 600,
    height: 300,
  },
};

interface Props {
  isOpen: boolean;
  close: () => void;
  match: any;
  location: any;
  history: any;
}

const ShareRoomModal: React.SFC<Props> = ({ isOpen, close, location }) => {
  console.log(location);
  return (
    <Modal isOpen={isOpen} close={close} styles={modalStyles}>
      <Container>
        <Title>Share with others</Title>
        <Paragraph>Make the room crowded!</Paragraph>

        <ModalTextInput
          value={`${window.location.origin}${location.pathname}`}
          onChange={() => {}}
          readOnly={true}
        />
      </Container>
    </Modal>
  );
};

export default withRouter(ShareRoomModal);
