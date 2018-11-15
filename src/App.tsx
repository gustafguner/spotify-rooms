import * as queryString from 'query-string';
import * as React from 'react';
import { Provider } from 'constate';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Header from './components/Header';
import { routes } from './routes';

const spotifyApi = new SpotifyWebApi();

const initialState = {
  loggedIn: false,
};

const onMount = ({ setContextState }: any) => {
  const tokenFromStorage = localStorage.getItem('spotify-access-token');
  if (tokenFromStorage) {
    spotifyApi.setAccessToken(tokenFromStorage);
  }
  const parsedUrl = queryString.parse(window.location.search);
  const tokenFromUrl = parsedUrl.access_token as string | undefined;

  if (tokenFromUrl) {
    spotifyApi.setAccessToken(tokenFromUrl);
    localStorage.setItem('spotify-access-token', tokenFromUrl);
  }

  setContextState('auth', {
    loggedIn: tokenFromUrl || tokenFromStorage ? true : false,
  });
};

const App = () => (
  <Provider initialState={initialState} onMount={onMount}>
    <Header />
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, exact, Component }) => (
          <Route key={path} path={path} exact={exact} component={Component} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
