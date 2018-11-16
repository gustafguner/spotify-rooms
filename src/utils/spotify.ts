import SpotifyWebApi from 'spotify-web-api-js';
import * as queryString from 'query-string';

const spotifyApi = new SpotifyWebApi();

export const initializeSpotify = () => {
  const redirected = storeTokensFromUrl();
  if (redirected) {
    spotifyApi.setAccessToken(getAccessToken()!);
  } else {
    const accessToken = getAccessToken();
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }
  checkAndRefreshAccessToken();
};

const storeTokensFromUrl = () => {
  const parsedUrl = queryString.parse(window.location.search);

  const accessTokenFromUrl = parsedUrl.access_token as string | undefined;
  if (accessTokenFromUrl) {
    storeAccessToken(accessTokenFromUrl);
  }
  const refreshTokenFromUrl = parsedUrl.refresh_token as string | undefined;
  if (refreshTokenFromUrl) {
    storeRefreshToken(refreshTokenFromUrl);
  }

  const expiresInFromUrl = parsedUrl.expires_in as number | undefined;
  if (expiresInFromUrl) {
    storeExpire(expiresInFromUrl);
  }

  return getAccessToken() != null;
};

const storeAccessToken = (token: string) => {
  localStorage.setItem('spotify-access-token', token);
};

const getAccessToken = () => {
  return localStorage.getItem('spotify-access-token');
};

const storeRefreshToken = (token: string) => {
  localStorage.setItem('spotify-refresh-token', token);
};

const getRefreshToken = () => {
  return localStorage.getItem('spotify-refresh-token');
};

const storeExpire = (expiresIn: number) => {
  localStorage.setItem(
    'spotify-access-token-expires',
    JSON.stringify(Date.now() + expiresIn * 990),
  );
};

export const getMyCurrentPlayingTrack = async () => {
  return spotifyApi.getMyCurrentPlayingTrack();
};

const getTokenExpire = () => {
  const stored = localStorage.getItem('spotify-access-token-expires');
  return stored != null ? Number(stored) : 0;
};

export const checkAndRefreshAccessToken = () => {
  if (getTokenExpire() < Date.now()) {
    fetch(
      'http://localhost:8888/refreshAccessToken?refresh_token=' +
        getRefreshToken(),
    )
      .then((e) => e.json())
      .then((data) => {
        storeAccessToken(data.access_token);
        spotifyApi.setAccessToken(data.access_token);
        storeExpire(data.expires_in);
      });
  }
};

export const getSpotifyAuthorizeUrl = () => {
  fetch('http://localhost:8888/spotifyAuthorizeUrl')
    .then((e) => e.json())
    .then((data) => {
      window.location = data.spotify_authorize_url;
    });
};
