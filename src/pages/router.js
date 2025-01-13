// src/routes/routesConfig.js
import { Login } from './Login';
import { Home } from './Home';
import { ResetPassword } from './ResetPassword';
import { Report } from './Report';
import React from 'react';

const routesConfig = [
  {
    path: '/login',
    element: <Login />, 
    isProtected: false,
    isHideAfterAuth: true,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    isProtected: false,
    isHideAfterAuth: true,
  },
  {
    path: '/home',
    element: <Home />,
    isProtected: true
  },
  {
    path: '/report',
    element: <Report />,
    isProtected: true
  }
];

export default routesConfig;
