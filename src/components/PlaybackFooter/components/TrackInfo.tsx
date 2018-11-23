import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';

interface TrackInfoProps {
  name: string;
  artists: any;
  image: string;
}

const Wrapper = styled('div')`
  display: flex;
  flex-basis: 30%;
  min-width: 180px;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
`;

const AlbumImageContainer = styled('div')`
  flex-basis: 50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 16px;
`;

const AlbumImage = styled('img')`
  width: 100%;
  height: 100%;
`;

const Headings = styled('div')`
  display: flex;
  flex-flow: row wrap;
  width: calc(100% - 50px - 16px);
  flex-direction: column;
`;

const Title = styled('div')`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  a {
    color: white;
    text-decoration: none;
  }
`;

const Artist = styled('div')`
  width: 100%;
  color: ${colors.GRAY};
  font-weight: 300;
  font-size: 14px;
`;

const TrackInfo: React.SFC<TrackInfoProps> = ({ name, artists, image }) => (
  <Wrapper>
    <AlbumImageContainer>
      <AlbumImage src={image} />
    </AlbumImageContainer>
    <Headings>
      <Title>
        <a href="">{name}</a>
      </Title>
      <Artist>
        {artists === null
          ? ''
          : artists
              .map((e: any) => {
                return e.name;
              })
              .join(', ')}
      </Artist>
    </Headings>
  </Wrapper>
);

export default TrackInfo;
