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
  marginLeft: 15,
  marginRight: 15,
  position: 'relative',
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: '0 0 13px rgba(0,0,0,0.2)',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.022)',
  },
});

const Link = styled(ReactLink)({
  textDecoration: 'none',
  position: 'relative',
  zIndex: 1,
});

const Spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const CoverImageWrapper = styled('div')({
  width: 120,
  flexBasis: 120,
  flexShrink: 0,
  height: 120,
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  overflow: 'hidden',
  animation: `${Spin} 1.8s linear infinite`,
  position: 'relative',
  zIndex: 1,
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
  background: `linear-gradient(${colors.PRIMARY_GRAY}, rgba(0,0,0,0.8))`,
});

const DarkFilter = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.36)',
  backgroundImage:
    'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.10))',
});

const CoverContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: 160,
});

const MetaInfoContainer = styled('div')({
  width: '100%',
  height: 100,
  paddingTop: 15,
  paddingBottom: 15,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column',
  backgroundColor: colors.PRIMARY_GRAY,
  '&:before': {
    position: 'absolute',
    content: '""',
    left: 0,
    bottom: 0,
    height: '100%',
    width: 15,
    backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), ${
      colors.PRIMARY_GRAY
    } 40%)`,
    zIndex: 1,
  },
  '&:after': {
    position: 'absolute',
    content: '""',
    right: 0,
    bottom: 0,
    height: '100%',
    width: 15,
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), ${
      colors.PRIMARY_GRAY
    } 40%)`,
    zIndex: 1,
  },
});

const Name = styled('div')({
  textDecoration: 'none',
  color: colors.WHITE,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 600,
  flexBasis: 26,
  flexShrink: 0,
  flexGrow: 0,
  marginBottom: 5,
  width: '100%',
});

const TrackContainer = styled('div')({
  flexBasis: 28,
  flexShrink: 0,
  flexGrow: 0,
  width: '100%',
  position: 'relative',
});

const Roll = (parentWidth: number | null) =>
  keyframes({
    '0%': { transform: 'translateX(15px)' },
    '100%': { transform: `translateX(calc(${parentWidth}px - 100% - 15px))` },
  });

interface TrackProps {
  parentWidth: number | null;
}

const Track = styled('div')(({ parentWidth = null }: TrackProps) => ({
  color: 'rgba(255,255,255,0.5)',
  whiteSpace: 'nowrap',
  position: 'absolute',
  fontSize: 15,
  lineHeight: '26px',
  fontWeight: 300,
  animation: `${Roll(parentWidth)} 5s infinite alternate ease-in-out`,
}));

const Room: React.SFC<Props> = ({ room }) => {
  const isTrack = room.playback && room.playback.id !== null;
  const trackRef: any = React.useRef(null);
  console.log(trackRef);
  return (
    <Container>
      <Link to={`/room/${room.id}`}>
        <CoverContainer>
          <CoverImageWrapper>
            {isTrack ? (
              <CoverImage src={room.playback.images[0].url} />
            ) : (
              <DefaultCoverImage />
            )}
          </CoverImageWrapper>
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
        </CoverContainer>
        <MetaInfoContainer>
          <Name>{room.name}</Name>
          <TrackContainer innerRef={trackRef}>
            <Track
              parentWidth={
                trackRef.current !== null ? trackRef.current.offsetWidth : null
              }
            >
              {isTrack ? (
                <>
                  {room.playback.name}
                  {' – '}
                  {room.playback.artists !== null
                    ? room.playback.artists
                        .map((e: any) => {
                          return e.name;
                        })
                        .join(', ')
                    : ''}
                </>
              ) : (
                <>{'No currently playing track'}</>
              )}
            </Track>
          </TrackContainer>
        </MetaInfoContainer>
      </Link>
    </Container>
  );
};

export default Room;
