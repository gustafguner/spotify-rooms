import * as React from 'react';
import styled from 'react-emotion';
import { colors } from '../../../styles/colors';
import { withRouter } from 'react-router';

interface TrackInfoProps {
  name: string;
  artists: any;
  image: string;
}

const AlbumImageContainer = styled('div')({
  flexBasis: 90,
  flexShrink: 0,
  flexGrow: 0,
  width: 90,
  height: '100%',
  overflow: 'hidden',
  marginRight: 16,
});

const AlbumImage = styled('img')({
  width: '100%',
  height: '100%',
  float: 'left',
});

const Headings = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  width: 'calc(100% - 95px - 16px)',
  flexDirection: 'column',
});

const Title = styled('div')({
  width: '100%',
  fontWeight: 700,
  fontSize: 16,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: 2,
  a: {
    color: colors.WHITE,
    textDecoration: 'none',
  },
});

const Artist = styled('div')({
  width: '100%',
  color: colors.GRAY,
  fontWeight: 300,
  fontSize: 14,
});

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
