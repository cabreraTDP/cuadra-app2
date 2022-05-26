import { AUTH_LOGIN, AUTH_LOGOUT } from './types';
import { Post } from '../../utils/axiosUtils';

export const login = (respuesta) => {
  return async (dispatch, getState) => {
    try {
      console.log('auth...')
      
      let resp = false;

      if(respuesta){
        resp=true;
        await dispatch({
          type: AUTH_LOGIN, 
          payload:{isSignedIn:true}
        });
      }else{
        await dispatch({
          type: AUTH_LOGIN, 
          payload:{isSignedIn:false}
        });
      }

      return resp;

    } catch (err) {
      console.log(
        err.message
      );
      return null;
    }
  };
};

export const prueba = () => {
  return async (dispatch) => {
    try {
      console.log('probando...')
      const resp = await Post('/prueba/');
      const data = resp.data;
      console.log(data)

      return data;

    } catch (err) {
      console.log(
        err.message
      );
      return null;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await dispatch({
      type: AUTH_LOGOUT,
    });

    return null;
  };
};