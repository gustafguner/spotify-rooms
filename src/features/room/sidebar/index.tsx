import * as React from 'react';
import Queue from './components/queue';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';
import { searchTracks } from 'src/utils/spotify';
import * as color from 'color';

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
  width: 380px;
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
  outline: none;
  color: ${colors.WHITE};
  '&:focus' {
    outline: none;
  }
  &::placeholder {
    color: ${colors.GRAY_OFF};
  }
`;

const SuggestionsContainer = styled.div`
  width: 100%;
  position: absolute;
  background: ${colors.DARK_GRAY};
  top: 0;
  transform: translateY(-100%);
  display: flex;
  flex-flow: column;
`;

const Suggestions = styled.div`
  padding: 10px;
`;

const SuggestionsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  padding: 10px 10px 0 10px;
  color: ${colors.GRAY};
  font-size: 15px;
`;

const SuggestionTrack = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
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

const CoverImageWrapper = styled.div`
  width: 55px;
  height: 55px;
  flex-basis: 55px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
`;

const CoverImage = styled.img`
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

const Sidebar: React.FunctionComponent<Props> = ({ roomId }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<null | any[]>(null);
  const [suggestionsVisible, setSuggestionsVisible] = React.useState(false);

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
      <DarkTint visible={suggestionsVisible !== false} />
      <Queue roomId={roomId} />

      <AddToQueue>
        {suggestionsVisible !== false && (
          <SuggestionsContainer>
            <SuggestionsTitle>Search results</SuggestionsTitle>
            <Suggestions>
              {searchResults !== null ? (
                searchResults.length !== 0 ? (
                  searchResults.map((track) => (
                    <Mutation mutation={MUTATION} key={track.id}>
                      {(mutate) => (
                        <SuggestionTrack
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
                        </SuggestionTrack>
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
            </Suggestions>
          </SuggestionsContainer>
        )}

        <TextInput
          type="text"
          value={searchQuery}
          placeholder="Search for a track that you like..."
          onChange={handleTrackSearchInputChange}
          onFocus={() => {
            setSuggestionsVisible(true);
          }}
          onBlur={() => {
            // setSearchFieldFocused(false);
          }}
        />
      </AddToQueue>
    </Container>
  );
};

export default Sidebar;
