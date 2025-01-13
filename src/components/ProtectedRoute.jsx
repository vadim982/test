import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { localStorageKeys } from '../constants/localStorageKeys';

export const ProtectedRoute = ({ isHideAfterAuth, isProtected, children }) => {
    const isLogin = localStorage.getItem(localStorageKeys.isLogin);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

    if (!isLogin && isProtected) return <Navigate to="/login" state={{ from: location }} replace />;

    if (isLogin && isHideAfterAuth) return <Navigate to={from} replace />

    return children;
};
