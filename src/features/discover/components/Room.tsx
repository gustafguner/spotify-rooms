import * as React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled, { keyframes } from 'react-emotion';
import { colors } from 'src/styles';
import Blur from 'react-blur';
import * as ReactCSSTransitionReplace from 'react-css-transition-replace';

interface Props {
  room: any;
}

const Container = styled('div')({
  width: 260,
  flexBasis: 260,
  flexShrink: 0,
  height: 260,
  backgroundColor: colors.ALMOST_BLACK,
  marginLeft: 15,
  marginRight: 15,
  position: 'relative',
  borderRadius: 5,
  overflow: 'hidden',
});

const Link = styled(ReactLink)({
  textDecoration: 'none',
});

const Spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const CoverImageWrapper = styled('div')({
  width: 150,
  flexBasis: 150,
  flexShrink: 0,
  height: 150,
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  overflow: 'hidden',
  animation: `${Spin} 1.8s linear infinite`,
  position: 'relative',
});

const CoverImage = styled('img')({
  float: 'left',
  width: '100%',
  height: '100%',
});

const DefaultCoverImage = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.PRIMARY_GRAY,
});

const BackgroundWrapper = styled('div')({
  width: '100%',
  height: '100%',
});

const BackgroundBlur = styled(Blur)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
});

const DefaultBackground = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  background: 'linear-gradient(#009FAE, #1ED760)',
});

const DarkFilter = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.36)',
  backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.10))',
});

const CoverContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 15,
});

const MetaInfoContainer = styled('div')({
  padding: 15,
  marginTop: 10,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

const Name = styled('div')({
  textDecoration: 'none',
  color: colors.WHITE,
  textAlign: 'center',
  fontSize: 18,
});

const Room: React.SFC<Props> = ({ room }) => {
  const isTrack = room.playback && room.playback.id !== null;
  return (
    <Container>
      <ReactCSSTransitionReplace
        transitionName="cross-fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        overflowHidden={false}
        transitionAppear={true}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        className={'absolute-react-replace'}
      >
        {isTrack && room.playback.images[0].url !== null ? (
          <BackgroundWrapper key={`track-bg-${room.playback.id}`}>
            <BackgroundBlur
              img={room.playback.images[0].url}
              blurRadius={60}
              enableStyles={true}
            />
          </BackgroundWrapper>
        ) : (
          <BackgroundWrapper key="track-default-bg">
            <DefaultBackground />
          </BackgroundWrapper>
        )}
      </ReactCSSTransitionReplace>

      <DarkFilter />

      <Link to={`/room/${room.id}`}>
        <CoverContainer>
          <CoverImageWrapper>
            {isTrack ? (
              <CoverImage src={room.playback.images[0].url} />
            ) : (
              <DefaultCoverImage />
            )}
          </CoverImageWrapper>
        </CoverContainer>
        <MetaInfoContainer>
          <Name>{room.name}</Name>
        </MetaInfoContainer>
      </Link>
    </Container>
  );
};

export default Room;
