import * as React from 'react';
import createContainer from 'constate';
import { getToken, getUser } from './utils/auth';

const useRootContext = () => {
  const [rootContext, setRootContext] = React.useState({
    auth: {
      loggedIn: getToken() !== null,
      user: getUser(),
    },
    visitingRoom: null,
    playback: null,
    room: null,
  });
  return { rootContext, setRootContext };
};

const Root = createContainer(useRootContext);

export { Root };
