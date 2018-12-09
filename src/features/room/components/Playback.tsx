import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

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

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  height: 220,
  backgroundColor: colors.BLACK,
});

const Image = styled('img')({});

const Playback: React.SFC<PlaybackProps> = ({ track }) => (
  <Container>
    <Image src={track.images[0].url} />
  </Container>
);

export { Playback };
