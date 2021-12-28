import React from 'react'
import { Navigate } from 'react-router-dom';
import { User } from '../../redux/user/user.reducer';
import Spinner from '../spinner/Spinner';

type PrivateRouteProps = {
    user: User | null;
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    children: JSX.Element;
}

function PrivateRoute({ children, user, status }: PrivateRouteProps) {
    return status === 'idle' || status === 'pending' ? (
        <Spinner height='100vh' />
    ) : user ? (
        <Navigate to='/' />
    ) : (
        children
    )
}

export default PrivateRoute
