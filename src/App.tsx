import * as queryString from 'query-string';
import * as React from 'react';
import { Provider } from 'constate';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Home from './pages/Home';

import './App.css';

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
      <p>header</p>
      <BrowserRouter>
        <Switch>
          <Route key={'/'} path={'/'} exact={true} component={Home} />
        </Switch>
      </BrowserRouter>
      <a href="http://localhost:8888/login">Login with Spotify</a>
    </Provider>
  );
};

export default App;
