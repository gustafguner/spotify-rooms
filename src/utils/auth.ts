export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const clear = () => {
  localStorage.clear();
};
