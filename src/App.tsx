import * as queryString from 'query-string';
import * as React from 'react';
import { Provider } from 'constate';
import styled from 'react-emotion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import SpotifyWebApi from 'spotify-web-api-js';
import { setToken } from './utils/spotify';
import Header from './components/Header';
import { routes } from './routes';

// const spotifyApi = new SpotifyWebApi();

const SiteContainer = styled('div')`
  width: 100%;
  padding: 0 25px;
`;

const initialState = {
  loggedIn: false,
};

const onMount = ({ setContextState }: any) => {
  setContextState('auth', {
    loggedIn: localStorage.getItem('spotify-access-token') ? true : false,
  });
};

const App: React.SFC = () => {
  const parsedUrl = queryString.parse(window.location.search);
  const tokenFromUrl = parsedUrl.access_token as string | undefined;
  const tokenFromStorage = localStorage.getItem('spotify-access-token');

  if (tokenFromUrl) {
    setToken(tokenFromUrl);
    localStorage.setItem('spotify-access-token', tokenFromUrl);
  } else if (tokenFromStorage) {
    setToken(tokenFromStorage);
  }

  return (
    <Provider initialState={initialState} onMount={onMount}>
      <Header />
      <SiteContainer>
        <BrowserRouter>
          <Switch>
            {routes.map(({ path, exact, Component }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={Component}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </SiteContainer>
    </Provider>
  );
};

export default App;
