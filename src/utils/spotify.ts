import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const setToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const getMyCurrentPlayingTrack = async () => {
  return spotifyApi.getMyCurrentPlayingTrack();
};
