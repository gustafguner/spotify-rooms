import * as React from 'react';
import Queue from './components/queue';

import styled from 'styled-components';
import { colors } from 'src/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';

import { searchTracks } from 'src/utils/spotify';

const MUTATION = gql`
  mutation addTrackToQueue($input: AddTrackToQueueInput!) {
    addTrackToQueue(input: $input) {
      name
    }
  }
`;

interface Props {
  roomId: string;
}

const Container = styled.div`
  width: 350px;
  flex-basis: 350px;
  flex-shrink: 0;
  height: calc(100vh - 70px);
  background: ${colors.ALMOST_BLACK};
  box-shadow: -2px 0 18px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-flow: column;
`;

const AddToQueue = styled.div`
  width: 100%;
  flex-basis: 80px;
  flex-shrink: 0;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.DARK_GRAY};
  padding: 15px;
  position: relative;
`;

const TextInput = styled.input`
  font-size: 16px;
  border: none;
  flex-basis: 100%;
  height: 100%;
  background: none;
  color: ${colors.WHITE};
  ':focus' {
    outline: none;
  }
`;

const Suggestions = styled.div`
  width: 100%;
  position: absolute;
  background: ${colors.PRIMARY_GRAY};
  height: 225px;
  top: -225px;
  padding: 15px;
`;

const SuggestionTrack = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CoverImageWrapper = styled.div`
  width: 55px;
  height: 55px;
  flex-basis: 55px;
  flex-shrink: 0;
`;

const CoverImage = styled.img`
  float: left;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const TrackInfo = styled.div`
  width: calc(100% - 55px - 30px - 12px - 12px);
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin-left: 12;
  margin-right: 12;
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

const AddToQueueButton = styled.button`
  flex-basis: 30px;
  flex-shrink: 0;
  flex-grow: 0;
  font-size: 20px;
  padding: 0;
  color: rgba(255, 255, 255, 0.5);
`;

interface DarkTintProps {
  visible?: boolean;
}

const DarkTint = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: visibility 0s, opacity 0.2s;
  visibility: ${({ visible }: DarkTintProps) =>
    visible ? 'visible' : 'hidden'};
  opacity: ${({ visible }: DarkTintProps) => (visible ? '1' : '0')};
`;

const SearchStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

let spotifyTrackSearch: any = null;
let spotifyTrackSearchQuery: any = null;

const Sidebar: React.SFC<Props> = ({ roomId }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<null | any[]>(null);

  const handleTrackSearchInputChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchResults(null);

    if (query.length > 0) {
      if (spotifyTrackSearchQuery) {
        clearTimeout(spotifyTrackSearchQuery);
      }

      spotifyTrackSearchQuery = setTimeout(() => {
        if (spotifyTrackSearch !== null) {
          spotifyTrackSearch.abort();
        }
        spotifyTrackSearch = searchTracks(query, 3)
          .then(({ tracks }) => {
            spotifyTrackSearch = null;
            console.log(tracks.items);
            setSearchResults(tracks.items);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 1000);
    }
  };

  return (
    <Container>
      <DarkTint visible={searchQuery !== ''} />
      <Queue roomId={roomId} />

      <AddToQueue>
        {searchQuery !== '' && (
          <Suggestions>
            {searchResults !== null ? (
              searchResults.length !== 0 ? (
                searchResults.map((track) => (
                  <SuggestionTrack key={track.id}>
                    <CoverImageWrapper>
                      <CoverImage src={track.album.images[0].url} />
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
                    <Mutation mutation={MUTATION}>
                      {(mutate) => (
                        <AddToQueueButton
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
                          +
                        </AddToQueueButton>
                      )}
                    </Mutation>
                  </SuggestionTrack>
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
          </Suggestions>
        )}

        <TextInput
          type="text"
          value={searchQuery}
          placeholder="Search for a track that you like... 🤘"
          onChange={handleTrackSearchInputChange}
        />
      </AddToQueue>
    </Container>
  );
};

export default Sidebar;
