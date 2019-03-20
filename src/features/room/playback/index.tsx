import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from 'src/styles';
import Blur from 'react-blur';
import * as ReactCSSTransitionReplace from 'react-css-transition-replace';
import { v4 as uuid } from 'uuid';

interface Props {
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

const Wrapper = styled.div`
  width: 100%;
  height: 230px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 25px;
  height: 100%;
  position: relative;
`;

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CoverImageWrapper = styled.div`
  width: 180px;
  flex-basis: 180px;
  flex-shrink: 0;
  height: 180px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  overflow: hidden;
  animation: ${Spin} 1.8s linear infinite;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background: ${colors.BLACK};
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  float: left;
`;

const DefaultCoverImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.PRIMARY_GRAY};
`;

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const BackgroundBlur = styled(Blur)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const DefaultBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(#009fae, #1ed760);
`;

const DarkFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.36);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.1)
  );
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 3px;
`;

interface ProgressBarFillProps {
  position: number;
  duration: number;
}

const ProgressGrow = (width: number) => keyframes`
  0%: {
    width: ${width}%;
    content: "${uuid()}";
  }
  100%: { 
    width: 100%;
  }
`;

const ProgressBarFill = styled.div`
  width: ${({ position, duration }: ProgressBarFillProps) =>
    (position / duration) * 100}%;
  height: 100%;
  background: rgba(255, 255, 255, 0.24);
  animation: ${({ position, duration }: ProgressBarFillProps) =>
    `${ProgressGrow((position / duration) * 100)} ${duration -
      position}ms linear forwards`};
`;

const TrackInfo = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 40px;
`;

const TrackName = styled.h1`
  margin: 0 0 7px 0;
`;

const Artists = styled.div`
  font-size: 22px;
  color: rgba(255, 255, 255, 0.55);
`;

const Playback: React.SFC<Props> = ({ track }) => {
  const isTrack = track && track.id !== null;
  const [position, setPosition] = React.useState(isTrack ? track.position : 0);

  React.useEffect(
    () => {
      setPosition(isTrack ? track.position : 0);
    },
    [track],
  );

  return (
    <>
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
            <DefaultBackground />
          </BackgroundWrapper>
        )}
      </ReactCSSTransitionReplace>

      <DarkFilter />

      {isTrack && (
        <ProgressBarContainer>
          <ProgressBarFill position={position} duration={track.duration} />
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
    </>
  );
};

export default Playback;
