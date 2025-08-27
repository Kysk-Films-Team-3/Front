import React, { useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Login } from './components/modal/Login';
import { Registration } from './components/modal/Registration';
import { Forgot } from './components/modal/Forgot';
import { NewPassword } from './components/modal/NewPassword';
import { CreatePassword } from './components/modal/CreatePassword';
import { RegistrationComplete } from './components/modal/RegistrationComplete';
import { ForgotComplete } from './components/modal/ForgotComplete';
import { VerifyCode } from './components/modal/VerifyCode';
import { SendCode } from './components/modal/SendCode';
import { Device } from './components/modal/Device';
import { Payment } from './components/modal/Payment';
import { Logout } from './components/modal/Logout';
import { AuthProvider, AuthContext } from './context/AuthContext';

export const App = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    const closeModal = () => setActiveModal(null);

    return (
        <AuthProvider>
            <AppWithContext
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                closeModal={closeModal}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
            />
        </AuthProvider>
    );
};

const AppWithContext = ({ activeModal, setActiveModal, closeModal, userEmail, setUserEmail }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <AppRoutes
                onLoginClick={() => setActiveModal('Login')}
                onDeviceClick={() => setActiveModal('Device')}
                onPaymentClick={() => setActiveModal('Payment')}
                onOpenLogoutModal={() => setActiveModal('Logout')}
                isLoggedIn={!!user}
                user={user}
            />

            {activeModal === 'Login' && (
                <Login
                    isOpen
                    onClose={closeModal}
                    onRegisterClick={() => setActiveModal('Registration')}
                    onForgot={() => setActiveModal('Forgot')}
                />
            )}

            {activeModal === 'Forgot' && (
                <Forgot
                    isOpen
                    onClose={closeModal}
                    onSuccess={(email) => {
                        setUserEmail(email);
                        setActiveModal('Verify');
                    }}
                />
            )}

            {activeModal === 'Verify' && (
                <VerifyCode
                    isOpen
                    onClose={closeModal}
                    emailOrPhone={userEmail}
                    onVerified={() => setActiveModal('NewPassword')}
                />
            )}

            {activeModal === 'NewPassword' && (
                <NewPassword
                    isOpen
                    onClose={closeModal}
                    emailOrPhone={userEmail}
                    onPasswordCreated={() => setActiveModal('ForgotComplete')}
                />
            )}

            {activeModal === 'ForgotComplete' && (
                <ForgotComplete
                    isOpen
                    onClose={closeModal}
                    email={userEmail}
                />
            )}

            {activeModal === 'Registration' && (
                <Registration
                    isOpen
                    onClose={closeModal}
                    onRegisterSuccess={(email) => {
                        setUserEmail(email);
                        setActiveModal('SendCode');
                    }}
                />
            )}

            {activeModal === 'SendCode' && (
                <SendCode
                    isOpen
                    onClose={closeModal}
                    email={userEmail}
                    onCodeVerified={() => setActiveModal('CreatePassword')}
                />
            )}

            {activeModal === 'CreatePassword' && (
                <CreatePassword
                    isOpen
                    onClose={closeModal}
                    email={userEmail}
                    onPasswordCreated={() => setActiveModal('RegistrationComplete')}
                />
            )}

            {activeModal === 'RegistrationComplete' && (
                <RegistrationComplete
                    isOpen
                    onClose={closeModal}
                    email={userEmail}
                />
            )}

            {activeModal === 'Device' && <Device isOpen onClose={closeModal} />}
            {activeModal === 'Payment' && <Payment isOpen onClose={closeModal} />}
            {activeModal === 'Logout' && (
                <Logout
                    isOpen
                    onClose={closeModal}
                    onUserLogout={logout}
                />
            )}
        </BrowserRouter>
    );
};
