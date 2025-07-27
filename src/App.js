import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
        </BrowserRouter>
    );
};
