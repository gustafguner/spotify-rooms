import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import FlipMove from 'react-flip-move';
import { Button, DullButton } from 'src/components/buttons';
import * as color from 'color';
import { EmptyIcon, Svg } from 'src/components/icons';

interface Props {
  queue: any;
  roomId: string;
  searchFieldRef: any;
  addSubscribe: () => void;
  voteSubscribe: () => void;
  removeSubscribe: () => void;
}

const Container = styled.div`
  width: 100%;
  flex-basis: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 15px;
  overflow-y: scroll;
`;

const Item = styled.div`
  width: 100%;
  flex-basis: 80px;
  flex-shrink: 0;
  padding: 10px;
  background: ${colors.PRIMARY_GRAY};
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  &:last-child {
    margin-bottom: 0;
  }
`;

const CoverImageWrapper = styled.div`
  width: 65px;
  flex-basis: 65px;
  flex-shrink: 0;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const TrackInfo = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-flow: row wrap;
  overflow: hidden;
`;

const TrackNameContainer = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`;

const TrackName = styled.a`
  color: ${colors.WHITE};
  text-decoration: none;
`;

const TrackArtists = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 300;
  color: ${colors.GRAY};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackVotes = styled.div`
  flex-basis: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
`;

const VoteButton = styled(Button)`
  padding: 9px 15px;
  background: ${color(colors.PRIMARY_GRAY)
    .darken(0.15)
    .string()};
  &:hover {
    background: ${color(colors.PRIMARY_GRAY)
      .darken(0.3)
      .string()};
  }
`;

interface VoteCountProps {
  voted?: boolean;
}

const VoteCount = styled.div`
  text-align: center;
  color: ${({ voted }: VoteCountProps) =>
    voted ? colors.WHITE : 'rgba(255,255,255,0.5)'};
  font-size: 15px;
  margin-left: 3px;
`;

const EmptyQueueContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const EmptyQueue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  ${Svg} {
    fill: ${colors.GRAY_OFF};
    width: 48px;
    height: 48px;
  }
  & > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const EmptyQueueText = styled.p`
  color: ${colors.GRAY_OFF};
  text-align: center;
`;

const VOTE_FOR_TRACK = gql`
  mutation voteForTrack($input: VoteForTrackInput!) {
    voteForTrack(input: $input)
  }
`;

const QueueView: React.FC<Props> = ({
  queue,
  roomId,
  searchFieldRef,
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
          <EmptyQueue>
            <EmptyIcon />
            <EmptyQueueText>The queue is empty</EmptyQueueText>
            <DullButton
              onClick={() => {
                console.log(searchFieldRef.current.focus());
              }}
            >
              Add a track
            </DullButton>
          </EmptyQueue>
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
                  ? track.artists.map((a: any) => a.name).join(', ')
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
                    <VoteCount>{track.voters.length}</VoteCount>
                  </VoteButton>
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
