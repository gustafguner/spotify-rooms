import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import Users from './users';
import {
  CoopIcon,
  DjIcon,
  LockIcon,
  Svg,
  GlobeIcon,
  LinkIcon,
  SettingsIcon,
} from 'src/components/icons';
import { DullButton } from 'src/components/buttons';
import ShareRoomModal from './share-room-modal';
import Tooltip from 'src/components/core/tooltip';
import SettingsModal from './settings-modal';

interface Props {
  room: any;
  users: any[];
  userEnteredSubscribe: () => void;
  userLeftSubscribe: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: ${colors.DARK_GRAY};
  padding: 0 25px;
  justify-content: space-between;
`;

const Meta = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  > * {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  max-width: 175px;
  ${Svg} {
    width: 18px;
    height: 18px;
    fill: ${colors.GRAY};
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

const Name = styled.div`
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
  width: calc(100% - 28px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Mode = styled.div`
  color: ${colors.WHITE};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  max-width: 100px;
  ${Svg} {
    width: 28px;
    height: 28px;
    fill: ${colors.GRAY};
    margin-right: 10px;
  }
`;

const ModeName = styled.div`
  color: ${colors.GRAY};
  font-weight: 600;
  font-size: 13px;
  width: calc(100% - 38px);
  letter-spacing: 0.2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const StatusButton = styled(DullButton)`
  ${Svg} {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
`;

const StatusView: React.FC<Props> = ({
  room,
  users,
  userEnteredSubscribe,
  userLeftSubscribe,
}) => {
  const [userEnteredUnubscribe, setUserEnteredUnubscribe]: any = React.useState(
    null,
  );
  const [userLeftUnubscribe, setUserLeftUnubscribe]: any = React.useState(null);
  const [shareModalIsOpen, setShareModalIsOpen]: any = React.useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen]: any = React.useState(
    false,
  );

  React.useEffect(() => {
    setUserEnteredUnubscribe(userEnteredSubscribe());
    setUserLeftUnubscribe(userLeftSubscribe());

    return () => {
      if (userEnteredUnubscribe !== null) {
        userEnteredUnubscribe();
      }

      if (userLeftUnubscribe !== null) {
        userLeftUnubscribe();
      }
    };
  }, []);

  return (
    <Container>
      <Meta>
        <NameContainer>
          {room.private === true ? (
            <>
              <LockIcon data-tip={true} data-for="private-tooltip" />
              <Tooltip id="private-tooltip">Private</Tooltip>
            </>
          ) : (
            <>
              <GlobeIcon data-tip={true} data-for="public-tooltip" />
              <Tooltip id="public-tooltip">Public</Tooltip>
            </>
          )}
          <Name>{room.name}</Name>
        </NameContainer>

        <Mode>
          {room.mode === 'co-op' ? (
            <>
              <CoopIcon />
              <ModeName>Co-op</ModeName>
            </>
          ) : (
            <>
              <DjIcon />
              <ModeName>DJ</ModeName>
            </>
          )}
        </Mode>

        <StatusButton
          onClick={() => {
            setShareModalIsOpen(true);
          }}
        >
          Share
          <LinkIcon />
        </StatusButton>

        <StatusButton
          onClick={() => {
            setSettingsModalIsOpen(true);
          }}
        >
          Settings
          <SettingsIcon />
        </StatusButton>
      </Meta>
      <Users users={users} />

      <ShareRoomModal
        isOpen={shareModalIsOpen}
        close={() => {
          setShareModalIsOpen(false);
        }}
      />

      <SettingsModal
        isOpen={settingsModalIsOpen}
        close={() => {
          setSettingsModalIsOpen(false);
        }}
        room={room}
      />
    </Container>
  );
};

export default StatusView;
