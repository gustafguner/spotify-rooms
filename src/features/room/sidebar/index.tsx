import * as React from 'react';
import Queue from './components/queue';
import styled from 'styled-components';
import { colors } from 'src/styles';
import { getTopTracks, searchTracks } from 'src/utils/spotify';
import { ClickOutside } from 'src/components/core';
import DiscoverTracks from './components/discover-tracks';

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

const DiscoverContainer = styled.div`
  width: 100%;
  height: 340px;
  position: absolute;
  background: ${colors.DARK_GRAY};
  top: 0;
  transform: translateY(-100%);
  display: flex;
  flex-flow: column;
`;

const Discover = styled.div`
  width: 100%;
  height: calc(100% - 45px);
  padding: 10px;
  overflow-y: scroll;
  position: relative;
`;

const DiscoverTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  padding: 10px 10px 0 10px;
  color: ${colors.GRAY};
  font-size: 15px;
`;

const DiscoverTracksFadeout = styled.div`
  width: 100%;
  height: 30px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: linear-gradient(${colors.TRANSPARENT}, ${colors.DARK_GRAY});
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

let spotifyTrackSearch: any = null;
let spotifyTrackSearchQuery: any = null;

interface Props {
  room: any;
}

const Sidebar: React.FC<Props> = ({ room }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<null | any[]>(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = React.useState<
    null | any[]
  >(null);
  const [discoverVisible, setDiscoverVisible] = React.useState(false);
  const searchFieldRef: any = React.useRef(null);

  React.useEffect(() => {
    if (recentlyPlayedTracks === null) {
      getTopTracks()
        .then(({ tracks }) => {
          setRecentlyPlayedTracks(tracks.items.map((track) => track.track));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

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
        spotifyTrackSearch = searchTracks(query, 10)
          .then(({ tracks }) => {
            spotifyTrackSearch = null;
            setSearchResults(tracks.items);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 700);
    }
  };

  return (
    <Container>
      <DarkTint visible={discoverVisible !== false} />

      <Queue
        roomId={room.id}
        roomMode={room.mode}
        roomDj={room.dj}
        searchFieldRef={searchFieldRef}
      />

      <ClickOutside
        on={() => {
          setDiscoverVisible(false);
        }}
      >
        <AddToQueue>
          {discoverVisible !== false && (
            <DiscoverContainer>
              <DiscoverTitle>
                {searchQuery !== '' ? 'Search results' : 'Top tracks'}
              </DiscoverTitle>
              <Discover>
                <DiscoverTracks
                  tracks={
                    searchQuery !== '' ? searchResults : recentlyPlayedTracks
                  }
                  roomId={room.id}
                />
                <DiscoverTracksFadeout />
              </Discover>
            </DiscoverContainer>
          )}

          <TextInput
            type="text"
            value={searchQuery}
            placeholder="Search for a track on Spotify..."
            onChange={handleTrackSearchInputChange}
            onFocus={() => {
              setDiscoverVisible(true);
            }}
            ref={searchFieldRef}
          />
        </AddToQueue>
      </ClickOutside>
    </Container>
  );
};

export default Sidebar;
