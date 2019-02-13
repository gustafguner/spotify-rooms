import * as React from 'react';
import styled from 'react-emotion';
import CoreModal from 'src/components/CoreModal';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const CreateRoomModal: React.SFC<Props> = ({ isOpen, close }) => {
  return (
    <CoreModal isOpen={isOpen} close={close}>
      <h1>Create room</h1>
    </CoreModal>
  );
};

export default CreateRoomModal;
