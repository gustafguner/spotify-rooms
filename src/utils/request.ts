import { getToken } from './auth';

export const getRequest = (url: string) => {
  return request(url, 'GET');
};

export const postRequest = (url: string) => {
  return request(url, 'POST');
};

const request = (url: string, method: string, body?: object) => {
  return fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
