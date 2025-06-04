import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// Membuat context dengan default value undefined
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(undefined);
// Komponen provider untuk konteks otentikasi
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));
        };
        window.addEventListener('storage', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);
    return _jsx(AuthContext.Provider, { value: { isAuthenticated, setIsAuthenticated }, children: children });
};
