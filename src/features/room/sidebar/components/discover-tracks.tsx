import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { colors } from 'src/styles';
import * as color from 'color';
import Loader from 'src/components/Loader';

const MUTATION = gql`
  mutation addTrackToQueue($input: AddTrackToQueueInput!) {
    addTrackToQueue(input: $input) {
      name
    }
  }
`;

const Track = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${color(colors.PRIMARY_GRAY)
    .lighten(0.1)
    .string()};
  border-radius: 3px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${color(colors.PRIMARY_GRAY)
      .lighten(0.05)
      .string()};
  }
`;

const TrackCoverWrapper = styled.div`
  width: 55px;
  height: 55px;
  flex-basis: 55px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const TrackCover = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const TrackInfo = styled.div`
  width: calc(100% - 55px - 30px - 15px - 15px);
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-left: 15px;
  margin-right: 15px;
`;

const TrackName = styled.div`
  flex-basis: 20px;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtists = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${colors.GRAY};
  flex-grow: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface Props {
  roomId: string;
  tracks: any[] | null;
}

const DiscoverTracks: React.FunctionComponent<Props> = ({ roomId, tracks }) => (
  <>
    {tracks !== null ? (
      tracks.length !== 0 ? (
        tracks.map((track) => (
          <Mutation mutation={MUTATION} key={track.id}>
            {(mutate) => (
              <Track
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
                <TrackCoverWrapper>
                  <TrackCover src={track.album.images[0].url} />
                </TrackCoverWrapper>
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
              </Track>
            )}
          </Mutation>
        ))
      ) : (
        <SearchStatusContainer>
          <div>We couldn't find any tracks 😢</div>
        </SearchStatusContainer>
      )
    ) : (
      <SearchStatusContainer>
        <Loader />
      </SearchStatusContainer>
    )}
  </>
);

export default DiscoverTracks;
