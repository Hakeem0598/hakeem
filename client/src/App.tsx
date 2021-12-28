import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import GlobalStyles from './components/Global.styled';
import PrivateRoute from './components/private-route/private-route';
import { useActions } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import PageNotFound from './pages/404/Page-not-found';
import Cart from './pages/cart/Cart';
import ForgotPassword from './pages/forgot-password/Forgot-password';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import ProductPage from './pages/product-page/Product-page';
import ProductsPage from './pages/products-page/Products-page';
import Register from './pages/register/Register';
import ResetPassword from './pages/reset-password/Reset-password';
import Success from './pages/success/Success';

function App() {
    const { currentUser: user, status } = useTypedSelector(state => state.user);
    const { getMe } = useActions();
    
    useEffect(() => {
        getMe()
    }, [])
    
    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/success' element={<Success />} />
                <Route path='/products/:category' element={<ProductsPage />} />
                <Route path='/product/:slug/:id' element={<ProductPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path='/sign-in' element={<PrivateRoute user={user} status={status}><Login /></PrivateRoute>} />
                <Route path='/sign-up' element={<PrivateRoute user={user} status={status}><Register /></PrivateRoute>} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;

