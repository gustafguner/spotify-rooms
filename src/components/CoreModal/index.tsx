import * as React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from 'src/styles';

interface ModalProps {
  open: boolean;
  close: () => void;
}

const CoreModal: React.SFC<ModalProps> = ({ open, close }) => (
  <Modal
    open={open}
    onClose={close}
    onEscKeyDown={close}
    onOverlayClick={close}
    center={true}
    styles={{
      overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
      modal: {
        width: '600px',
        backgroundColor: colors.PRIMARY_GRAY,
      },
    }}
  >
    <h1>Modal</h1>
  </Modal>
);

export default CoreModal;
