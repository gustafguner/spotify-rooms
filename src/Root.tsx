import * as React from 'react';
import createContainer from 'constate';
import { getToken, getUser } from './utils/auth';

const useRoot = () => {
  const [root, setRoot] = React.useState({
    auth: {
      loggedIn: getToken() !== null,
      user: getUser(),
    },
    visitingRoom: null,
    playback: null,
  });
  return { root, setRoot };
};

const Root = createContainer(useRoot);

export { Root };
