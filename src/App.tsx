import * as queryString from 'query-string';
import * as React from 'react';
import { Provider } from 'constate';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Header from './components/Header';
import { routes } from './routes';

const spotifyApi = new SpotifyWebApi();

const getNowPlaying = () => {
  return spotifyApi.getMyCurrentPlaybackState();
};

const App = () => {
  const parsed = queryString.parse(window.location.search);
  const accessToken = parsed.access_token as string | undefined;
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  getNowPlaying();

  return (
    <Provider>
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
};

export default App;
