import * as React from 'react';
import FlipMove from 'react-flip-move';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import * as color from 'color';

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

interface Props {
  list: any;
  mutation: any;
  roomId: string;
}

const QueueList: React.FC<Props> = ({ list, mutation, roomId }) => (
  <FlipMove>
    {list.map((track: any) => (
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
        <Mutation mutation={mutation}>
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
);

export default QueueList;
