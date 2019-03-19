import * as React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from 'src/styles';
import styled from 'react-emotion';

interface ModalProps {
  isOpen: boolean;
  close?: () => void;
}

const StyledModal = styled(Modal)({
  backgroundColor: colors.WHITE,
  borderRadius: 2,
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
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      },
      modal: {
        backgroundColor: colors.WHITE,
        width: 800,
      },
      closeIcon: {
        fill: 'rgba(0, 0, 0, 0.3)',
      },
    }}
  >
    {children}
  </StyledModal>
);

export default CoreModal;
