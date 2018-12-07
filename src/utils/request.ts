import { getToken } from './auth';

interface RequestOptions {
  method: 'GET' | 'POST';
  body?: object;
  raw?: boolean;
}

export const request = (url: string, { method, body, raw }: RequestOptions) => {
  return fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw response;
    }
    return raw ? response : response.json();
  });
};
