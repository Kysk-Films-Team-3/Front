import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SettingsPage } from '../pages/SettingsPage';
import { Premium } from '../pages/Premium';
import { Layout } from '../layout/Layout';

export const AppRoutes = ({ onLoginClick, onDeviceClick, onPaymentClick, onOpenLogoutModal, isLoggedIn, user }) => {
    return (
        <Routes>
            <Route
                element={<Layout onLoginClick={onLoginClick} isLoggedIn={isLoggedIn} user={user} />}
            >
                <Route path="/" element={<Home />} />
                <Route path="/premium" element={<Premium />} />
                <Route
                    path="/settings"
                    element={
                        <SettingsPage
                            onOpenLogoutModal={onOpenLogoutModal}
                            onPaymentClick={onPaymentClick}
                            onDeviceClick={onDeviceClick}
                            user={user}
                        />
                    }
                />
            </Route>
        </Routes>
    );
};
