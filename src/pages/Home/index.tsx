import * as React from 'react';
import { Container } from 'constate';

export const Home = () => (
  <Container context="auth">
    {({ loggedIn }) => (
      <>
        <h2>hej</h2>
      </>
    )}
  </Container>
);
