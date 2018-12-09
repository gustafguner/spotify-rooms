import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import Blur from 'react-blur';

interface PlaybackProps {
  track: Track;
}

interface Track {
  name: string;
  images: Image[];
  artists: Artist[];
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

const CoverImageWrapper = styled('div')({
  width: 180,
  flexBasis: 180,
  flexShrink: 0,
  height: 180,
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
});

const CoverImage = styled('img')({
  float: 'left',
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

const TrackInfo = styled('div')({
  width: '100%',
  marginLeft: 40,
});

const TrackName = styled('h1')({
  margin: 0,
});

const Playback: React.SFC<PlaybackProps> = ({ track }) => (
  <Wrapper>
    <BackgroundBlur img={track.images[0].url} blurRadius={60} />
    <DarkFilter />

    <Container>
      <CoverImageWrapper>
        <CoverImage src={track.images[0].url} />
      </CoverImageWrapper>
      <TrackInfo>
        <TrackName>{track.name}</TrackName>
      </TrackInfo>
    </Container>
  </Wrapper>
);

export { Playback };
