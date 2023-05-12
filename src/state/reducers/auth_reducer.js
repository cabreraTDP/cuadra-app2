import { AUTH_LOGIN, AUTH_LOGOUT, EMPRESA_SELECT } from '../actions/types';

const idEmpresa = localStorage.getItem('token')

const initialState = {
  loading: true,
  isSignedIn: false,
  idEmpresa: idEmpresa
};
    /* eslint-disable */

  

export default (state = initialState, action) => {
  const { type, payload } = action;
  console.log('payload',payload)
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: false,
        isSignedIn: payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        isSignedIn: null
      };
    case EMPRESA_SELECT:
      return {
        ...state,
        loading: true,
        idEmpresa: payload
      }

    default:
      return state;
  }
};

    /* eslint-enable */