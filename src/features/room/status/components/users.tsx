import * as React from 'react';
import styled from 'react-emotion';
import { colors } from 'src/styles';
import FlipMove from 'react-flip-move';

interface Props {
  users: any[];
}

const Container = styled('div')({
  width: 400,
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
});

const FadeOut = styled('div')({
  position: 'absolute',
  left: 0,
  height: '100%',
  width: 50,
  background: `linear-gradient(to right, ${colors.DARK_GRAY} 0%, ${
    colors.TRANSPARENT
  } 100%)`,
  zIndex: 1,
});

const Avatar = styled('div')({
  flexBasis: 28,
  flexShrink: 0,
  flexGrow: 0,
  height: 28,
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  marginLeft: 6,
  ':last-child': {
    marginLeft: 0,
  },
});

const AvatarImage = styled('img')({
  float: 'left',
  width: '100%',
  height: '100%',
});

const Quantity = styled('div')({
  marginLeft: 16,
  height: 34,
  width: 56,
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
});

const Digit = styled('div')({
  fontSize: 17,
  textAlign: 'center',
  lineHeight: '13px',
  color: colors.WHITE,
  flexBasis: '100%',
  flexShrink: 0,
  flexGrow: 0,
});

const Text = styled('div')({
  fontSize: 13,
  textAlign: 'center',
  lineHeight: '14px',
  color: colors.GRAY,
  flexBasis: '100%',
  flexShrink: 0,
  flexGrow: 0,
});

const Avatars = styled(FlipMove)({
  display: 'flex',
  height: 34,
  alignItems: 'center',
  overflow: 'hidden',
  flexFlow: 'row-reverse',
});

const Users: React.SFC<Props> = ({ users }) => (
  <Container>
    <FadeOut />
    <Avatars>
      {users.map((user: any) => (
        <Avatar key={user.id}>
          <AvatarImage src={user.image} />
        </Avatar>
      ))}
    </Avatars>

    <Quantity>
      <Digit>{users.length <= 100 ? users.length : '100+'}</Digit>
      <Text>{users.length === 1 ? 'listener' : 'listeners'}</Text>
    </Quantity>
  </Container>
);

export default Users;
