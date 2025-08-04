import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Layout } from '../layout/Layout';

export const AppRoutes = ({ onLoginClick, isLoggedIn, onLogout }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        onLoginClick={onLoginClick}
                        isLoggedIn={isLoggedIn}
                        onLogout={onLogout}
                    />
                }
            >
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
};
