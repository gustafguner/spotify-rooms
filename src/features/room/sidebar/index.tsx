import * as React from 'react';
import Queue from './components/queue';

import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'src/components/Loader';

import { searchTracks } from 'src/utils/spotify';

const Container = styled('div')({
  width: 350,
  flexBasis: 350,
  flexShrink: 0,
  height: 'calc(100vh - 70px)',
  backgroundColor: colors.ALMOST_BLACK,
  boxShadow: '-2px 0 18px rgba(0,0,0,0.2)',
  position: 'relative',
  display: 'flex',
  flexFlow: 'column',
});

const AddToQueue = styled('div')({
  width: '100%',
  flexBasis: 80,
  flexShrink: 0,
  height: 80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.DARK_GRAY,
  padding: 15,
  position: 'relative',
});

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

const TextInput = styled('input')({
  fontSize: 16,
  border: 'none',
  flexBasis: '100%',
  height: '100%',
  background: 'none',
  color: colors.WHITE,
  ':focus': {
    outline: 'none',
  },
});

const Suggestions = styled('div')({
  width: '100%',
  position: 'absolute',
  backgroundColor: colors.PRIMARY_GRAY,
  height: 225,
  top: -225,
  padding: 15,
});

const SuggestionTrack = styled('div')({
  width: '100%',
  display: 'flex',
  marginBottom: 15,
  ':last-child': {
    marginBottom: 0,
  },
});

const CoverImageWrapper = styled('div')({
  width: 55,
  height: 55,
  flexBasis: 55,
  flexShrink: 0,
});

const CoverImage = styled('img')({
  float: 'left',
  width: '100%',
  height: '100%',
  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
});

const TrackInfo = styled('div')({
  width: 'calc(100% - 55px - 30px - 12px - 12px)',
  flexBasis: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column',
  marginLeft: 12,
  marginRight: 12,
});

const TrackName = styled('div')({
  flexBasis: 20,
  flexShrink: 0,
  fontWeight: 700,
  fontSize: 15,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TrackArtists = styled('div')({
  width: '100%',
  fontSize: 13,
  color: colors.GRAY,
  flexGrow: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const AddToQueueButton = styled('button')({
  flexBasis: 30,
  flexShrink: 0,
  flexGrow: 0,
  fontSize: 20,
  padding: 0,
  color: 'rgba(255,255,255,0.5)',
});

interface DarkTintProps {
  visible?: boolean;
}

const DarkTint = styled('div')(({ visible = false }: DarkTintProps) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  transition: 'visibility 0s, opacity 0.2s',
  visibility: visible ? 'visible' : 'hidden',
  opacity: visible ? 1 : 0,
}));

const SearchStatusContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

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
