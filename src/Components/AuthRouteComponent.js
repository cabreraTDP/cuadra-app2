import React from 'react';
import { Outlet, Navigate } from 'react-router';

import { Post } from '../utils/axiosUtils';


const AuthRouteComponent = ({children, ...propierties}) => {

  //const {isSignedIn} =  store.getState().auth.isSignedIn
  //console.log('getting store',isSignedIn);
  //console.log('esta autenticado',isSignedIn)
  const user = Post('/users/check');

  return user ? <Outlet /> : <Navigate to="/" />
}

export {AuthRouteComponent};