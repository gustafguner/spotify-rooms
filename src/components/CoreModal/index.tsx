import * as React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from 'src/styles';
import styled from 'react-emotion';

interface ModalProps {
  isOpen: boolean;
  close?: () => void;
}

const StyledModal = styled(Modal)({
  backgroundColor: colors.PRIMARY_GRAY,
  modal: {
    width: '1000px',
  },
});

const CoreModal: React.SFC<ModalProps> = ({
  isOpen,
  close = () => {},
  children,
}) => (
  <StyledModal
    open={isOpen}
    onClose={close}
    onEscKeyDown={close}
    onOverlayClick={close}
    center={true}
    styles={{
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
      modal: {
        backgroundColor: colors.PRIMARY_GRAY,
        width: 600,
      },
      closeIcon: {
        fill: 'rgba(255,255,255,0.5)',
      },
    }}
  >
    {children}
  </StyledModal>
);

export default CoreModal;
