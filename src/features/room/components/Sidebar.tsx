import * as React from 'react';
import { useState } from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import { Button } from 'src/components/buttons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useContextState } from 'constate';
import { Queue } from './Queue';

import { searchTracks } from 'src/utils/spotify';

const Container = styled('div')({
  width: 350,
  flexBasis: 350,
  flexShrink: 0,
  height: 'calc(100vh - 90px - 70px)',
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
  backgroundColor: colors.DARK_BG,
  padding: 15,
  position: 'relative',
});

const AddToQueueButton = styled(Button)({
  marginBottom: 8,
});

const Text = styled('p')({
  fontSize: 14,
  flexBasis: 20,
  flexShrink: 0,
  textAlign: 'center',
});

const MUTATION = gql`
  mutation addTrackToQueue($input: AddTrackToQueueInput!) {
    addTrackToQueue(input: $input)
  }
`;

interface SidebarProps {
  room: any;
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
  backgroundColor: colors.PRIMARY_DARK,
  height: 240,
  top: -240,
  padding: 15,
});

const SuggestionTrack = styled('div')({
  width: '100%',
  display: 'flex',
});

const CoverImageWrapper = styled('div')({
  width: 50,
  height: 50,
  flexBasis: 50,
  flexShrink: 0,
});

const CoverImage = styled('img')({
  float: 'left',
  width: '100%',
  height: '100%',
});

const TrackInfo = styled('div')({
  flexBasis: '100%',
  display: 'flex',
});

const TrackName = styled('div')({});

let spotifyTrackSearch: any = null;
let spotifyTrackSearchQuery: any = null;

const Sidebar: React.SFC<SidebarProps> = ({ room }) => {
  const [searchQuery, setSearchQuery] = useContextState(null, '');
  const [searchResults, setSearchResults] = useState<null | any[]>(null);

  const handleTrackSearchInputChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setSearchResults(null);
    }

    if (query.length > 0) {
      if (spotifyTrackSearchQuery) {
        clearTimeout(spotifyTrackSearchQuery);
      }

      spotifyTrackSearchQuery = setTimeout(() => {
        if (spotifyTrackSearch !== null) {
          spotifyTrackSearch.abort();
        }
        spotifyTrackSearch = searchTracks(query)
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
      <Queue queue={room.queue} />
      <AddToQueue>
        {searchResults !== null && (
          <Suggestions>
            {searchResults.map((track) => (
              <SuggestionTrack key={track.id}>
                <CoverImageWrapper>
                  <CoverImage src={track.album.images[0].url} />
                </CoverImageWrapper>
                <TrackInfo>
                  <TrackName>{track.name}</TrackName>
                </TrackInfo>
              </SuggestionTrack>
            ))}
          </Suggestions>
        )}

        <Mutation mutation={MUTATION}>
          {(mutate) => (
            <>
              <TextInput
                type="text"
                value={searchQuery}
                placeholder="Search for a track that you like... 🤘"
                onChange={handleTrackSearchInputChange}
              />
            </>
          )}
        </Mutation>
      </AddToQueue>
    </Container>
  );
};

export { Sidebar };
