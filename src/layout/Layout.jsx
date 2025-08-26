import React from "react";
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import './Layout.css';

export const Layout = ({ onLoginClick, isLoggedIn, user, onLogout }) => {
    const location = useLocation();
    const hideHeaderPaths = ['/settings'];
    const hideHeader = hideHeaderPaths.includes(location.pathname);

    return (
        <>
            {!hideHeader && (
                <Header
                    onLoginClick={onLoginClick}
                    isLoggedIn={isLoggedIn}
                    user={user}
                    onLogout={onLogout}
                />
            )}
            <main className={hideHeader ? 'no-header' : ''}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
