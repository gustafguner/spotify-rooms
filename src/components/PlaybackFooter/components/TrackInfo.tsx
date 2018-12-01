import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';

interface TrackInfoProps {
  name: string;
  artists: any;
  image: string;
}

const AlbumImageContainer = styled('div')`
  flex-basis: 90px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 90px;
  height: 100%;
  overflow: hidden;
  margin-right: 16px;
`;

const AlbumImage = styled('img')`
  width: 100%;
  height: 100%;
  float: left;
`;

const Headings = styled('div')`
  display: flex;
  flex-flow: row wrap;
  width: calc(100% - 95px - 16px);
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
  <>
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
  </>
);

export default TrackInfo;
