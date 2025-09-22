import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Login } from './components/modal/Login';
import { Forgot } from './components/modal/Forgot';
import { Registration } from './components/modal/Registration';
import { SendCode } from './components/modal/SendCode';
import { CreatePassword } from './components/modal/CreatePassword';
import { RegistrationComplete } from './components/modal/RegistrationComplete';
import { NewPassword } from './components/modal/NewPassword';
import { ForgotComplete } from './components/modal/ForgotComplete';
import { VerifyCode } from './components/modal/VerifyCode';
import { Device } from './components/modal/Device';
import { Payment } from './components/modal/Payment';
import { Logout } from './components/modal/Logout';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { ActorProvider } from './context/ActorContext';
import { ActorRecommendations } from './components/modal/ActorRecommendations';

export const App = () => {
    return (
        <AuthProvider>
            <SettingsProvider>
                <ActorProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </ActorProvider>
            </SettingsProvider>
        </AuthProvider>
    );
};

const AppContent = () => {
    const {
        activeModal,
        openModal,
        closeModal,
        emailOrPhone,
        setEmailOrPhone,
        logout,
        user,
        allContent,
    } = useContext(AuthContext);

    return (
        <>
            <AppRoutes
                onLoginClick={() => openModal('login')}
                onDeviceClick={() => openModal('device')}
                onPaymentClick={() => openModal('payment')}
                onOpenLogoutModal={() => openModal('logout')}
                onOpenActorRecs={(actor) => openModal({ type: 'actorRecs', actor })}
                user={user}
                isLoggedIn={!!user}
            />

            {activeModal === 'login' && (
                <Login
                    isOpen
                    onClose={closeModal}
                    onForgot={() => openModal('forgot')}
                    onRegisterClick={() => openModal('registration')}
                    setEmailOrPhone={setEmailOrPhone}
                />
            )}

            {activeModal === 'forgot' && (
                <Forgot
                    isOpen
                    onClose={closeModal}
                    setEmailOrPhone={setEmailOrPhone}
                    onSuccess={(email) => {
                        setEmailOrPhone(email);
                        openModal('verifyCode');
                    }}
                />
            )}

            {activeModal === 'registration' && (
                <Registration
                    isOpen
                    onClose={closeModal}
                    onRegisterSuccess={() => openModal('sendCode')}
                    setEmailOrPhone={setEmailOrPhone}
                />
            )}

            {activeModal === 'sendCode' && (
                <SendCode
                    isOpen
                    onClose={closeModal}
                    onCodeVerified={() => openModal('createPassword')}
                />
            )}

            {activeModal === 'createPassword' && (
                <CreatePassword
                    isOpen
                    onClose={closeModal}
                    onPasswordCreated={() => openModal('registrationComplete')}
                />
            )}

            {activeModal === 'registrationComplete' && (
                <RegistrationComplete isOpen onClose={closeModal} />
            )}

            {activeModal === 'device' && <Device isOpen onClose={closeModal} />}
            {activeModal === 'payment' && <Payment isOpen onClose={closeModal} />}

            {activeModal === 'logout' && (
                <Logout
                    isOpen
                    onClose={closeModal}
                    onUserLogout={() => {
                        logout();
                        closeModal();
                    }}
                />
            )}

            {activeModal === 'newPassword' && (
                <NewPassword
                    isOpen
                    onClose={closeModal}
                    emailOrPhone={emailOrPhone}
                    onPasswordCreated={() => openModal('forgotComplete')}
                />
            )}

            {activeModal === 'verifyCode' && (
                <VerifyCode
                    isOpen
                    onClose={closeModal}
                    emailOrPhone={emailOrPhone}
                    onVerified={() => openModal('newPassword')}
                />
            )}

            {activeModal === 'forgotComplete' && (
                <ForgotComplete isOpen onClose={closeModal} email={emailOrPhone} />
            )}

            {activeModal?.type === 'actorRecs' && (
                <ActorRecommendations
                    actor={activeModal.actor}
                    allContent={allContent}
                    onClose={closeModal}
                />
            )}
        </>
    );
};
