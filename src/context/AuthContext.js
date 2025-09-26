import React, { createContext, useState, useEffect } from "react";
import {
    loginUserAPI,
    logoutUser,
    getAuthUser,
    fakeRegisterEmail,
    sendVerificationCodeAPI,
    verifyCodeAPI,
    setPasswordAPI,
    getRememberedUser,
    refreshAccessTokenAPI
} from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getAuthUser() || null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [remembered, setRemembered] = useState(() => getRememberedUser());
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (!token) return;

        const interval = setInterval(async () => {
            try {
                const res = await refreshAccessTokenAPI();
                if (res?.success) {
                    setToken(res.token);
                    localStorage.setItem("token", res.token);
                } else {
                    await logout();
                }
            } catch {
                await logout();
            }
        }, 3 * 60 * 1000);

        return () => clearInterval(interval);
    }, [token]);

    const login = async (emailOrPhone, password, rememberMe = false) => {
        try {
            const res = await loginUserAPI(emailOrPhone, password);
            if (res?.success) {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));

                if (rememberMe) {
                    localStorage.setItem("rememberedUser", emailOrPhone);
                    setRemembered(emailOrPhone);
                } else {
                    localStorage.removeItem("rememberedUser");
                    setRemembered(null);
                }
            }
            return res;
        } catch (err) {
            return { success: false, error: err?.message || 'Ошибка логина' };
        }
    };

    const logout = async () => {
        try {
            const res = await logoutUser();
            if (!res?.success) {
                console.error('Logout error:', res?.message || 'Ошибка при выходе');
                alert('Ошибка при выходе. Попробуйте снова.');
                return false;
            }
        } catch (err) {
            console.error('Logout error:', err);
            alert('Ошибка при выходе. Попробуйте снова.');
            return false;
        }

        setUser(null);
        setToken(null);
        setEmailOrPhone('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    };

    const startRegistration = async (email, remember = false) => {
        try {
            const res = await fakeRegisterEmail(email);
            if (res?.success) {
                setEmailOrPhone(email);

                if (remember) {
                    localStorage.setItem("rememberedUser", email);
                    setRemembered(email);
                } else {
                    localStorage.removeItem("rememberedUser");
                    setRemembered(null);
                }
            }
            return res;
        } catch (err) {
            return { success: false, error: err?.message || 'Ошибка регистрации' };
        }
    };

    const sendRegistrationCode = async (email) => await sendVerificationCodeAPI(email);
    const verifyRegistrationCode = async (email, code) => await verifyCodeAPI(email, code);
    const sendRecoveryCode = async (email) => await sendVerificationCodeAPI(email);
    const verifyRecoveryCode = async (email, code) => await verifyCodeAPI(email, code);

    const createPassword = async (email, password) => {
        try {
            const res = await setPasswordAPI(email, password);
            if (res?.success) {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
            }
            return res;
        } catch (err) {
            return { success: false, error: err?.message || 'Ошибка создания пароля' };
        }
    };

    const openModal = (name, email = '') => {
        setActiveModal(name);
        if (email) setEmailOrPhone(email);
    };
    const closeModal = () => setActiveModal(null);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            remembered,
            isLoggedIn: !!token,
            emailOrPhone,
            activeModal,
            setActiveModal,
            openModal,
            closeModal,
            setEmailOrPhone,
            login,
            logout,
            startRegistration,
            sendRegistrationCode,
            verifyRegistrationCode,
            sendRecoveryCode,
            verifyRecoveryCode,
            createPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};