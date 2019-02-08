import * as React from 'react';
import { useEffect } from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import FlipMove from 'react-flip-move';

interface Props {
  queue: any;
  roomId: string;
  addSubscribe: () => void;
  voteSubscribe: () => void;
  removeSubscribe: () => void;
}

const Container = styled('div')({
  width: '100%',
  flexBasis: '100%',
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  padding: 15,
  overflowY: 'scroll',
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
  ':last-child': {
    marginBottom: 0,
  },
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
  marginRight: 15,
  width: 'calc(100% - 65px - 40px - 30px)',
  display: 'flex',
  flexDirection: 'column',
  flexFlow: 'row wrap',
});

const TrackNameContainer = styled('div')({
  width: '100%',
  fontSize: 15,
  fontWeight: 700,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TrackName = styled('a')({
  color: colors.WHITE,
  textDecoration: 'none',
});

const TrackArtists = styled('div')({
  width: '100%',
  fontSize: 13,
  fontWeight: 300,
  color: colors.GRAY,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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

interface VoteCountProps {
  voted?: boolean;
}

const VoteCount = styled('div')(({ voted = false }: VoteCountProps) => ({
  textAlign: 'center',
  color: voted ? colors.WHITE : 'rgba(255,255,255,0.5)',
  fontSize: 15,
  marginLeft: 3,
}));

const EmptyQueueContainer = styled('div')({
  width: '100%',
  height: 'calc(100% - 80px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
});

const EmptyQueueText = styled('p')({
  color: colors.DARK_GRAY,
  textAlign: 'center',
});

const VOTE_FOR_TRACK = gql`
  mutation voteForTrack($input: VoteForTrackInput!) {
    voteForTrack(input: $input)
  }
`;

const QueueView: React.SFC<Props> = ({
  queue,
  roomId,
  addSubscribe,
  voteSubscribe,
  removeSubscribe,
}) => {
  const [addUnsubscribe, setAddUnsubscribe]: any = React.useState(null);
  const [voteUnsubscribe, setVoteUnsubscribe]: any = React.useState(null);
  const [removeUnsubscribe, setRemoveUnsubscribe]: any = React.useState(null);

  queue.sort((a: any, b: any) => {
    return (
      b.voters.length - a.voters.length || a.queueTimestamp - b.queueTimestamp
    );
  });

  useEffect(() => {
    setAddUnsubscribe(addSubscribe());
    setVoteUnsubscribe(voteSubscribe());
    setRemoveUnsubscribe(removeSubscribe());

    return () => {
      if (addUnsubscribe !== null) {
        addUnsubscribe();
      }
      if (voteUnsubscribe !== null) {
        voteUnsubscribe();
      }
      if (removeUnsubscribe !== null) {
        removeUnsubscribe();
      }
    };
  }, []);

  return (
    <Container>
      {queue.length === 0 && (
        <EmptyQueueContainer>
          <EmptyQueueText>The queue is empty</EmptyQueueText>
        </EmptyQueueContainer>
      )}
      <FlipMove>
        {queue.map((track: any) => (
          <Item key={track.id}>
            <CoverImageWrapper>
              <CoverImage src={track.images[0].url} />
            </CoverImageWrapper>
            <TrackInfo>
              <TrackNameContainer>
                <TrackName href="">{track.name}</TrackName>
              </TrackNameContainer>
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
            <Mutation mutation={VOTE_FOR_TRACK}>
              {(mutate) => (
                <TrackVotes>
                  <VoteButton
                    onClick={() => {
                      mutate({
                        variables: {
                          input: {
                            roomId,
                            trackId: track.id,
                          },
                        },
                      });
                    }}
                  >
                    👍
                  </VoteButton>
                  <VoteCount>{track.voters.length}</VoteCount>
                </TrackVotes>
              )}
            </Mutation>
          </Item>
        ))}
      </FlipMove>
    </Container>
  );
};

export default QueueView;
