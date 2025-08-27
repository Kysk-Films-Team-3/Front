import { createContext, useState, useEffect } from 'react';
import { loginUserAPI, logoutUser, saveRememberMe, getRememberedUser, getAuthUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const remembered = getRememberedUser();
        if (remembered) setUserEmail(remembered);

        const authUser = getAuthUser();
        if (authUser) setUser(authUser);
    }, []);

    const login = async (emailOrPhone, password, rememberMe) => {
        const response = await loginUserAPI(emailOrPhone, password);
        if (response.success) {
            setUser(response.user);
            setUserEmail(response.user.emailOrPhone || emailOrPhone);
            saveRememberMe(emailOrPhone, rememberMe);
        }
        return response;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        const remembered = getRememberedUser();
        setUserEmail(remembered || '');
    };

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, userEmail, setUserEmail, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
