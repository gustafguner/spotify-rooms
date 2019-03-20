import * as React from 'react';
import styled from 'styled-components';
import { colors } from 'src/styles';
import FlipMove from 'react-flip-move';

interface Props {
  users: any[];
}

const Container = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const FadeOut = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  width: 50px;
  background: linear-gradient(
    to right,
    ${colors.DARK_GRAY} 0% ${colors.TRANSPARENT} 100%
  );
  z-index: 1;
`;

const Avatar = styled.div`
  flex-basis: 28px;
  flex-shrink: 0;
  flex-grow: 0;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-left: 6px;
  &:last-child {
    margin-left: 0;
  }
`;

const AvatarImage = styled.img`
  float: left;
  width: 100%;
  height: 100%;
`;

const Quantity = styled.div`
  margin-left: 16px;
  width: 56px;
  height: 34px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const Digit = styled.div`
  font-size: 17px;
  text-align: center;
  line-height: 13px;
  color: ${colors.WHITE};
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Text = styled.div`
  font-size: 13px;
  text-align: center;
  line-height: 14px;
  color: ${colors.GRAY};
  flex-basis: 100%;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Avatars = styled(FlipMove)`
  display: flex;
  height: 34px;
  align-items: center;
  overflow: hidden;
  flex-flow: row-reverse;
`;

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
