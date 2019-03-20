import * as React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { colors } from 'src/styles';
import Blur from 'react-blur';
import * as ReactCSSTransitionReplace from 'react-css-transition-replace';

interface Props {
  room: any;
}

const Container = styled.div`
  width: 260px;
  flex-basis: 260px;
  flex-shrink: 0;
  height: 260px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease-in-out;
  &:hover {
    transform: scale(1.022);
  }
`;

const Link = styled(ReactLink)`
  text-decoration: none;
  position: relative;
  z-index: 1;
`;

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinRule = css`
  ${Spin} 1.8s infinite linear;
`;

const CoverImageWrapper = styled.div`
  width: 120px;
  flex-basis: 120px;
  flex-shrink: 0;
  height: 120px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border-radius: 50%;
  animation: ${SpinRule}
  position: relative;
  z-index: 1;
`;

const CoverImage = styled.img`
  float: left;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(${colors.PRIMARY_GRAY}, rgba(0, 0, 0, 0.8));
`;

const DarkFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.36);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.45),
    rgba(0, 0, 0, 0.1)
  );
`;

const CoverContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 160px;
`;

const MetaInfoContainer = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  background: ${colors.PRIMARY_GRAY};
  &:before {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    height: 100%;
    width: 15px;
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      ${colors.PRIMARY_GRAY} 40%
    );
    z-index: 1;
  }
  &::after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    height: 100%;
    width: 15px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      ${colors.PRIMARY_GRAY} 40%
    );
    z-index: 1;
  }
`;

const Name = styled.div`
  width: 100%;
  text-decoration: none;
  color: ${colors.WHITE};
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  flex-basis: 26px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-bottom: 5px;
`;

const TrackContainer = styled.div`
  width: 100%;
  position: relative;
  flex-basis: 28px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Roll = (parentWidth: number | null) => keyframes`
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(calc(${parentWidth}px - 100% - 15px));
  }
`;

const RollAnimationRule = (parentWidth: number | null) => css`
  ${Roll(parentWidth)} 5s infinite alternate ease-in-out;
`;

interface TrackProps {
  parentWidth: number | null;
}

const Track = styled.div`
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  position: absolute;
  font-size: 15px;
  line-height: 26px;
  font-weight: 300;
  animation: ${({ parentWidth }: TrackProps) => RollAnimationRule(parentWidth)};
`;

const Room: React.SFC<Props> = ({ room }) => {
  const isTrack = room.playback && room.playback.id !== null;
  const trackRef: any = React.useRef(null);
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
          <TrackContainer ref={trackRef}>
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
