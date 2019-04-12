import * as React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from 'src/styles';
import styled from 'styled-components';

interface ModalStyles {
  overlay?: object;
  modal?: object;
  closeIcon?: object;
}

interface ModalProps {
  isOpen: boolean;
  close?: () => void;
  styles?: ModalStyles;
}

const defaultStyles: ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  modal: {
    padding: 25,
    background: colors.ALMOST_WHITE,
    width: 800,
    borderRadius: 2,
    overflow: 'hidden',
  },
  closeIcon: {
    fill: 'rgba(0, 0, 0, 0.15)',
    zIndex: 1,
  },
};

const CoreModal: React.FC<ModalProps> = ({
  isOpen,
  close = () => {},
  styles = {},
  children,
}) => (
  <Modal
    open={isOpen}
    onClose={close}
    onEscKeyDown={close}
    onOverlayClick={close}
    center={true}
    styles={{
      modal: Object.assign({}, defaultStyles.modal, styles.modal),
      overlay: Object.assign({}, defaultStyles.overlay, styles.overlay),
      closeIcon: Object.assign({}, defaultStyles.closeIcon, styles.closeIcon),
    }}
  >
    {children}
  </Modal>
);

export { CoreModal };
