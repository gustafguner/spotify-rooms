import * as queryString from 'query-string';
import * as React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import './App.css';

const spotifyApi = new SpotifyWebApi();

const getNowPlaying = () => {
  spotifyApi
    .getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const App = () => {
  const parsed = queryString.parse(window.location.search);
  const accessToken = parsed.access_token as string | undefined;
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  getNowPlaying();
  return (
    <>
      <h1>Welcome</h1>
    </>
  );
};

export default App;
