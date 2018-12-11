import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';

interface QueueProps {
  queue: any[];
}

const Container = styled('div')({
  width: '100%',
  flexBasis: '100%',
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  padding: 15,
});

const Item = styled('div')({
  width: '100%',
  flexBasis: 80,
  flexShrink: 0,
  padding: 8,
  backgroundColor: colors.PRIMARY_DARK,
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15,
});

const CoverImageWrapper = styled('div')({
  width: 65,
  flexBasis: 65,
  flexShrink: 0,
  height: 65,
});

const CoverImage = styled('img')({
  width: '100%',
  height: '100%',
  float: 'left',
});

const TrackInfo = styled('div')({
  marginLeft: 15,
  flexBasis: '100%',
});

const TrackName = styled('div')({
  fontSize: 15,
  fontWeight: 700,
});

const TrackArtists = styled('div')({
  fontSize: 13,
});

const TrackVotes = styled('div')({
  flexBasis: 40,
  flexShrink: 0,
  flexGrow: 0,
  display: 'flex',
  alignItems: 'center',
});

const VoteButton = styled('button')({
  outline: 'none',
  border: 'none',
  background: 'none',
  fontSize: 20,
  width: 'auto',
  cursor: 'pointer',
  textAlign: 'center',
  flexBasis: 22,
  padding: 0,
});

const VoteCount = styled('div')({
  textAlign: 'center',
  color: 'rgba(255,255,255,0.5)',
  fontSize: 15,
  marginLeft: 3,
});

const Queue: React.SFC<QueueProps> = ({ queue }) => (
  <Container>
    {queue.map((track: any) => (
      <Item key={track.id}>
        <CoverImageWrapper>
          <CoverImage src={track.images[0].url} />
        </CoverImageWrapper>
        <TrackInfo>
          <TrackName>{track.name}</TrackName>
          <TrackArtists>
            {track.artists !== null
              ? track.artists
                  .map((e: any) => {
                    return e.name;
                  })
                  .join(', ')
              : ''}
          </TrackArtists>
        </TrackInfo>
        <TrackVotes>
          <VoteButton>👍</VoteButton>
          <VoteCount>{0}</VoteCount>
        </TrackVotes>
      </Item>
    ))}
  </Container>
);

export { Queue };
