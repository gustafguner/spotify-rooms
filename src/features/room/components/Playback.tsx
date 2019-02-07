import * as React from 'react';
import styled, { keyframes } from 'react-emotion';
import { colors } from 'src/styles';
import Blur from 'react-blur';
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
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const TrackName = styled('h1')({
  margin: '0 0 7px 0',
});

const Artists = styled('div')({
  fontSize: 22,
  color: 'rgba(255, 255, 255, 0.55)',
});

const Playback: React.SFC<PlaybackProps> = ({ track }) => {
  const isTrack = track && track.id !== null;

  const [position, setPosition] = React.useState(isTrack ? track.position : 0);
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(
    () => {
      setPosition(isTrack ? track.position : 0);
      setAnimated(true);

      return () => {
        setAnimated(false);
      };
    },
    [track],
  );

  return (
    <Wrapper>
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
        {isTrack && track.images[0].url !== null ? (
          <BackgroundWrapper key={`track-bg-${track.id}`}>
            <BackgroundBlur
              img={track.images[0].url}
              blurRadius={60}
              enableStyles={true}
            />
          </BackgroundWrapper>
        ) : (
          <BackgroundWrapper key="track-default-bg">
            <DefaultBackground key="track-default-bg" />
          </BackgroundWrapper>
        )}
      </ReactCSSTransitionReplace>

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
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {isTrack ? (
            <TrackInfo key={`track-${track.id}`}>
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
      </Container>
    </Wrapper>
  );
};

export { Playback };
