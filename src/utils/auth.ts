export const storeToken = (token: string) => {
  localStorage.setItem('spotify-access-token', token);
};

export const removeToken = () => {
  localStorage.removeItem('spotify-access-token');
};
