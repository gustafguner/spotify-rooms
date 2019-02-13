import * as React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from 'src/styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const CoreModal: React.SFC<ModalProps> = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    onEscKeyDown={onClose}
    onOverlayClick={onClose}
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
    <h1>Create a room</h1>
  </Modal>
);

export default CoreModal;
