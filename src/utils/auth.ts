export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const storeUser = (user: object) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user !== null ? JSON.parse(user) : null;
};

export const clear = () => {
  localStorage.clear();
};
