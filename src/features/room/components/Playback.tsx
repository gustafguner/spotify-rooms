import * as React from 'react';
import styled, { keyframes } from 'react-emotion';
import { colors } from 'src/styles';
import Blur from 'react-blur';
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from 'react-transition-group';
import * as ReactCSSTransitionReplace from 'react-css-transition-replace';

interface PlaybackProps {
  track: Track;
}

interface Track {
  id: string;
  name: string;
  images: Image[];
  artists: Artist[];
  queueTimestamp: string;
  playTimestamp: string;
  duration: number;
  position: number;
}

interface Image {
  url: string;
  width: number;
  height: number;
}

interface Artist {
  name: string;
}

const Wrapper = styled('div')({
  width: '100%',
  height: 230,
  position: 'relative',
});

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  padding: 25,
  height: '100%',
  position: 'relative',
});

const Spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const CoverImageWrapper = styled('div')({
  width: 180,
  flexBasis: 180,
  flexShrink: 0,
  height: 180,
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  overflow: 'hidden',
  animation: `${Spin} 1.8s linear infinite`,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: 4,
    backgroundColor: colors.BLACK,
  },
});

const CoverImage = styled('img')({
  float: 'left',
  width: '100%',
  height: '100%',
});

const DefaultCoverImage = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.PRIMARY_DARK,
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
  backgroundImage:
    'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.10))',
});

const ProgressBarContainer = styled('div')({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  height: 3,
});

interface ProgressBarFillProps {
  widthPercent: number;
  position: number;
  duration: number;
}

const ProgressGrow = (width: number) =>
  keyframes({
    '0%': { width: `${width}%` },
    '100%': { width: '100%' },
  });

const ProgressBarFill = styled('div')(
  ({ widthPercent, position, duration }: ProgressBarFillProps) => ({
    width: widthPercent + '%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.24)',
    animation: `${ProgressGrow(widthPercent)} ${duration -
      position}ms linear forwards`,
  }),
);

const TrackInfo = styled('div')({
  width: '100%',
  marginLeft: 40,
});

const TrackName = styled('h1')({
  margin: '0 0 7px 0',
});

const Artists = styled('div')({
  fontSize: 22,
  color: 'rgba(255, 255, 255, 0.55)',
});

type TransitionState = 'entering' | 'entered';

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  leaving: { opacity: 1 },
  leaved: { opacity: 0 },
};

const Playback: React.SFC<PlaybackProps> = ({ track }) => {
  const isTrack = track && track.id !== null;

  const [position, setPosition] = React.useState(isTrack ? track.position : 0);
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(
    () => {
      setPosition(isTrack ? track.position : 0);
      setAnimated(true);

      console.log('useEFFECT HT!');

      return () => {
        setAnimated(false);
        console.log('useEFFECT RETUR HIT!');
      };
    },
    [track],
  );

  return (
    <Wrapper>
      {isTrack ? (
        <>
          <BackgroundBlur img={track.images[0].url} blurRadius={60} />
        </>
      ) : (
        <DefaultBackground />
      )}
      <DarkFilter />

      {isTrack && (
        <ProgressBarContainer>
          <ProgressBarFill
            widthPercent={(position / track.duration) * 100}
            position={position}
            duration={track.duration}
          />
        </ProgressBarContainer>
      )}

      <Container>
        <CoverImageWrapper>
          {isTrack ? (
            <CoverImage src={track.images[0].url} />
          ) : (
            <DefaultCoverImage />
          )}
        </CoverImageWrapper>
        <ReactCSSTransitionReplace
          transitionName="fade-wait"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={400}
          overflowHidden={false}
          transitionAppear={true}
        >
          {isTrack ? (
            <TrackInfo key="track">
              <TrackName>{track.name}</TrackName>
              <Artists>
                {track.artists !== null
                  ? track.artists
                      .map((e: any) => {
                        return e.name;
                      })
                      .join(', ')
                  : ''}
              </Artists>
            </TrackInfo>
          ) : (
            <TrackInfo key="no-track">
              <TrackName>No currently playing track</TrackName>
            </TrackInfo>
          )}
        </ReactCSSTransitionReplace>

        {/*
        <TransitionGroup className="track-info-container">
          {isTrack ? (
            <Transition in={true} appear={true} timeout={400} key="track">
              {(state: TransitionState) => (
                <TrackInfo
                  style={{
                    ...transitionStyles[state],
                  }}
                >
                  <TrackName>{track.name}</TrackName>
                  <Artists>
                    {track.artists !== null
                      ? track.artists
                          .map((e: any) => {
                            return e.name;
                          })
                          .join(', ')
                      : ''}
                  </Artists>
                </TrackInfo>
              )}
            </Transition>
          ) : (
            <Transition in={true} appear={true} timeout={400} key="no-track">
              {(state: TransitionState) => (
                <TrackInfo
                  style={{
                    ...transitionStyles[state],
                  }}
                >
                  <TrackName>No currently playing track</TrackName>
                </TrackInfo>
              )}
            </Transition>
          )}
        </TransitionGroup>
                */}
      </Container>
    </Wrapper>
  );
  /*
  return track && track.id !== null ? (
    <Wrapper>
      <BackgroundBlur img={track.images[0].url} blurRadius={60} />
      <DarkFilter />
      <ProgressBarContainer>
        <ProgressBarFill
          widthPercent={(position / track.duration) * 100}
          position={position}
          duration={track.duration}
        />
      </ProgressBarContainer>
      <Container>
        <CoverImageWrapper>
          <CoverImage src={track.images[0].url} />
        </CoverImageWrapper>

        <CSSTransition
          in={animated}
          classNames="track-info"
          timeout={800}
          unmountOnExit={true}
        >
          <TrackInfo>
            <TrackName>{track.name}</TrackName>
            <Artists>
              {track.artists !== null
                ? track.artists
                    .map((e: any) => {
                      return e.name;
                    })
                    .join(', ')
                : ''}
            </Artists>
          </TrackInfo>
        </CSSTransition>
      </Container>
    </Wrapper>
  ) : (
    <Wrapper>
      <DefaultBackground />
      <DarkFilter />
      <Container>
        <CoverImageWrapper>
          <DefaultCoverImage />
        </CoverImageWrapper>
        <CSSTransition
          in={animated}
          classNames="track-info"
          timeout={800}
          unmountOnExit={true}
        >
          <TrackInfo>
            <TrackName>No currently playing track</TrackName>
          </TrackInfo>
        </CSSTransition>
      </Container>
    </Wrapper>
  );*/
};

export { Playback };
