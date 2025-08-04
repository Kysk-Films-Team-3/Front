import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

export const Layout = ({ onLoginClick, isLoggedIn, onLogout }) => {
    return (
        <>
            <Header
                onLoginClick={onLoginClick}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
