import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../pages/Login';

const PrivateRoute = () => {
    const {user, isAuthenticated} = useAuth0();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return user && isAuthenticated ? <Outlet /> : <Login/>;
}
export default PrivateRoute;