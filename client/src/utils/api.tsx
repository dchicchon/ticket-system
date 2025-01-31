import { useStore } from './store';

const HOST = 'localhost';
const PROTOCOL = 'http';
const PORT = 4000;
const API_VERSION = 1;

const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}/api/v${API_VERSION}`;

// TODO: need for message system to show user

interface options {
  debug: boolean;
}

export const get = async (route: string, options?: options | undefined) => {
  const errorMessage = useStore.getState().errorMessage;
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (options?.debug) {
      console.log({
        ROUTE: route,
        GET_RESULT: result,
        HEADERS: response.headers,
      });
    }
    return result;
  } catch (err) {
    console.log(err);
    errorMessage('Failed to fetch data from server');
  }
};

export const post = async (route: string, data: object, options?: options | null) => {
  const errorMessage = useStore.getState().errorMessage;
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (options?.debug) {
      console.log({
        ROUTE: route,
        POST_RESULT: result,
        response: response.headers,
      });
    }
    if (!response.ok) {
      return errorMessage(result.message);
    }
    return result;
  } catch (err) {
    console.log(err);
    errorMessage('Failed to fetch data from server');
  }
};

export const put = async (route: string, data: object, options?: options | null) => {
  const errorMessage = useStore.getState().errorMessage;
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (options?.debug) {
      console.log({
        ROUTE: route,
        PUT_RESULT: result,
      });
    }
    if (!response.ok) {
      errorMessage(result.message);
      return;
    }
    return result;
  } catch (err) {
    console.log(err);
    errorMessage('Failed to fetch data from server');
  }
};

export const destroy = async (route: string, options?: options | null) => {
  const errorMessage = useStore.getState().errorMessage;
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = await response.json();
    if (options?.debug) {
      console.log({
        ROUTE: route,
        PUT_RESULT: result,
      });
    }
    if (!response.ok) {
      errorMessage(result.message);
      return;
    }
    return result;
  } catch (err) {
    console.log(err);
    errorMessage('Failed to fetch data from server');
  }
};
