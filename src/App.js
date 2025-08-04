import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Login } from './components/modal/Login';
import { ForgotPassword } from './components/modal/ForgotPassword';
import { AccountRecovery } from './components/modal/AccountRecovery';
import { VerifyCode } from './components/modal/VerifyCode';

export const App = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [isForgotEmailOrPasswordOpen, setIsForgotEmailOrPasswordOpen] = useState(false);
    const [isConfirmCodeOpen, setIsConfirmCodeOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const openLogin = () => {
        setIsLoginOpen(true);
        setIsForgotOpen(false);
        setIsForgotEmailOrPasswordOpen(false);
        setIsConfirmCodeOpen(false);
    };

    const openForgot = () => {
        setIsForgotOpen(true);
        setIsLoginOpen(false);
        setIsForgotEmailOrPasswordOpen(false);
        setIsConfirmCodeOpen(false);
    };

    const openForgotEmailOrPassword = () => {
        setIsForgotEmailOrPasswordOpen(true);
        setIsForgotOpen(false);
        setIsConfirmCodeOpen(false);
    };

    const openConfirmCode = () => {
        setIsConfirmCodeOpen(true);
        setIsForgotOpen(false);
        setIsForgotEmailOrPasswordOpen(false);
        setIsLoginOpen(false);
    };

    const closeModals = () => {
        setIsLoginOpen(false);
        setIsForgotOpen(false);
        setIsForgotEmailOrPasswordOpen(false);
        setIsConfirmCodeOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        closeModals();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <AppRoutes
                onLoginClick={openLogin}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />

            {isLoginOpen && (
                <Login
                    isOpen={isLoginOpen}
                    onClose={closeModals}
                    onForgot={openForgot}
                    onLogin={handleLoginSuccess}
                />
            )}

            {isForgotOpen && (
                <ForgotPassword
                    isOpen={isForgotOpen}
                    onClose={closeModals}
                    onBack={openLogin}
                    onForgotEmailOrPasswordOpen={openForgotEmailOrPassword}
                    onConfirmCodeOpen={openConfirmCode}
                />
            )}

            {isForgotEmailOrPasswordOpen && (
                <AccountRecovery
                    isOpen={isForgotEmailOrPasswordOpen}
                    onClose={closeModals}
                    onBack={openForgot}
                />
            )}

            {isConfirmCodeOpen && (
                <VerifyCode
                    isOpen={isConfirmCodeOpen}
                    onClose={closeModals}
                    onBack={openForgot}
                />
            )}
        </BrowserRouter>
    );
};
