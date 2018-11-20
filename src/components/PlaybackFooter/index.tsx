import * as React from 'react';
import { Container, EffectMap, EffectProps } from 'constate';
import styled from 'react-emotion';
import { colors } from '../../styles';

interface State {
  loggedIn: boolean;
  currentTrack: any | null;
}

interface Effects {
  play: () => void;
}

const effects: EffectMap<State, Effects> = {
  play: () => ({ setState }: EffectProps<State>) => {
    setState(() => ({
      loggedIn: false,
    }));
  },
};

const PlaybackContainer = styled('div')`
  width: 100%;
  height: 85px;
  background-color: ${colors.PRIMARY_DARK};
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;

const AlbumImageContainer = styled('div')`
  flex-basis: 50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 16px;
`;

const AlbumImage = styled('img')`
  width: 100%;
  height: 100%;
`;

const Left = styled('div')`
  display: flex;
  flex-basis: 30%;
  min-width: 180px;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
`;

const TrackHeadings = styled('div')`
  display: flex;
  flex-flow: row wrap;
  width: calc(100% - 50px - 16px);
  flex-direction: column;
`;

const TrackTitle = styled('div')`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  a {
    color: white;
    text-decoration: none;
  }
`;

const TrackArtist = styled('div')`
  width: 100%;
  color: ${colors.GRAY};
  font-weight: 300;
  font-size: 14px;
`;

const Center = styled('div')`
  flex-basis: 60%;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 20px;
`;

const Right = styled('div')`
  display: flex;
  flex-basis: 30%;
  min-width: 180px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const PlaybackFooter: React.SFC = () => (
  <Container context="auth" effects={effects}>
    {({ currentTrack, play }) =>
      currentTrack != null ? (
        <PlaybackContainer>
          <Left>
            <AlbumImageContainer>
              <AlbumImage src={currentTrack.item.album.images[0].url} />
            </AlbumImageContainer>
            <TrackHeadings>
              <TrackTitle>
                <a href="">{currentTrack.item.name}</a>
              </TrackTitle>
              <TrackArtist>
                {currentTrack.item.artists
                  .map((e: any) => {
                    return e.name;
                  })
                  .join(', ')}
              </TrackArtist>
            </TrackHeadings>
          </Left>

          <Center>1</Center>

          <Right>2</Right>
        </PlaybackContainer>
      ) : (
        <div>...</div>
      )
    }
  </Container>
);

export default PlaybackFooter;
