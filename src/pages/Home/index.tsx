import * as React from 'react';
import { Container } from 'constate';

export const Home = () => (
  <Container context="auth">{({ loggedIn }) => <></>}</Container>
);
