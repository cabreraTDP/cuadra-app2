import axios from 'axios';

const URL = `${process.env.REACT_APP_URL_URI}`;

export const Post = async (url, body = {}, options = { withCredentials: true }) => {

  const config = {
    headers: { 'Content-Type': 'application/json'},
    ...options
  };
  const bodyStr = JSON.stringify(body);

  try {

    const ruta = URL+url
    const resp = await axios.post(ruta, bodyStr, config);

    return resp;

  } catch (err) {
    console.error('WHAT ???', err);
    // Somehow these axios errors are a little different (than err.message being the error message!)
  }
  return null;
};

export const Get = async (url, body = {}, options = { withCredentials: true }) => {

    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };

  
    const bodyStr = JSON.stringify(body);

    try {
      const ruta = URL+url
      const resp = await axios.get(ruta, bodyStr, config);
      
      return resp;
  
    } catch (err) {
      console.error('WHAT ???', err);
      // Somehow these axios errors are a little different (than err.message being the error message!)
    }
    return null;
  };

export const Delete = async (url, body = {}, options = { withCredentials: true }) => {

    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
  
    const bodyStr = JSON.stringify(body);
  
    try {
      const resp = await axios.delete(URL + url, bodyStr, config);
      return resp;
  
    } catch (err) {
      console.error('WHAT ???', err);
      // Somehow these axios errors are a little different (than err.message being the error message!)
    }
    return null;
  };


