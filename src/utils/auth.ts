import { useContextState } from 'constate';

export const storeToken = (token: string) => {
  localStorage.setItem('spotify-access-token', token);
};

export const removeToken = () => {
  localStorage.removeItem('spotify-access-token');
};

export const logOut = () => {
  localStorage.clear();
  const [, setLoggedIn] = useContextState('auth');
  setLoggedIn(false);
};
