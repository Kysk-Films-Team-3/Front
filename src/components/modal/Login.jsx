import React, { useState, useRef, useEffect, useContext } from 'react';
import './Login.css';
import { isValidEmailOrPhone, isValidPassword } from '../../validation/validation';
import { AuthContext } from '../../context/AuthContext';
import { Trans, useTranslation } from 'react-i18next';

export const Login = ({ isOpen, onClose, onForgot, onRegisterClick }) => {
    const { t } = useTranslation();
    const { login, remembered } = useContext(AuthContext);

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });

    const passwordInputRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        setEmailOrPhone(remembered || '');
        setPassword('');
        setRememberMe(!!remembered);
        setErrors({ emailOrPhone: '', password: '' });
    }, [isOpen, remembered]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) onClose();
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleFocus = () => setFocused(true);
    const handleBlur = (e) => {
        const related = e.relatedTarget;
        if (related === passwordInputRef.current || related === toggleButtonRef.current) return;
        setFocused(false);
    };

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
        passwordInputRef.current?.focus();
    };

    const validateFields = () => {
        const newErrors = { emailOrPhone: '', password: '' };
        let valid = true;

        if (!isValidEmailOrPhone(emailOrPhone.trim())) {
            newErrors.emailOrPhone = "Please enter a valid email or phone";
            valid = false;
        }

        if (!isValidPassword(password)) {
            newErrors.password = "Password must be at least 8 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        try {
            const response = await login(emailOrPhone.trim(), password, rememberMe);

            if (!response.success) {
                const apiErrors = { emailOrPhone: '', password: '' };
                const msg = response.message?.toLowerCase() || '';

                if (msg.includes('не знайден') || msg.includes('not found')) {
                    apiErrors.emailOrPhone = response.message;
                } else {
                    apiErrors.password = response.message;
                }

                setErrors(apiErrors);
            } else {
                onClose();
            }
        } catch {
            setErrors({ emailOrPhone: '', password: "Login failed" });
        }
    };

    const canSubmit = isValidEmailOrPhone(emailOrPhone.trim()) && isValidPassword(password);

    if (!isOpen) return null;

    return (
        <div className="login_overlay" role="dialog" aria-modal="true">
            <div className={`login_modal ${errors.emailOrPhone || errors.password ? 'has-errors' : ''}`} ref={loginRef}>
                <div className="login_close_icon" onClick={onClose}></div>

                <div className="login_title"><Trans i18nKey="login.title" /></div>

                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="login_input_block">
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            className={`login_input ${errors.emailOrPhone ? 'error' : ''}`}
                            value={emailOrPhone}
                            onChange={e => setEmailOrPhone(e.target.value)}
                            autoComplete="username"
                        />
                        <label htmlFor="email"><Trans i18nKey="login.emailOrPhone" /></label>
                        {errors.emailOrPhone && (
                            <div className="login_error_text">
                                <div className="login_error_icon" />
                                {errors.emailOrPhone}
                            </div>
                        )}
                    </div>

                    <div className="login_input_block login_password_container">
                        <input
                            ref={passwordInputRef}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder=" "
                            className={`login_input password_input ${errors.password ? 'error' : ''}`}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoComplete="current-password"
                        />
                        <label htmlFor="password"><Trans i18nKey="login.password" /></label>
                        {(focused || showPassword) && (
                            <button
                                ref={toggleButtonRef}
                                type="button"
                                className="login_toggle_password"
                                onClick={handleShowPassword}
                                tabIndex={-1}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            >
                                <span className={`login_eye_icon ${showPassword ? 'login_eye_closed' : 'login_eye_open'}`} />
                            </button>
                        )}

                        {errors.password && (
                            <div className="login_error_text">
                                <div className="login_error_icon" />
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="login_block">
                        <button type="submit" className={`login_button ${canSubmit ? 'valid' : ''}`}><Trans i18nKey="login.loginButton" /></button>
                    </div>
                </form>

                <div className="login_forgot_block">
                    <button type="button" className="login_forgot_link" onClick={onForgot}><Trans i18nKey="login.forgotPassword" /></button>
                </div>

                <div className="login_remember_block">
                    <div className="login_remember_wrapper">
                        <div
                            className={`login_custom_checkbox ${rememberMe ? 'login_checked' : ''}`}
                            onClick={() => setRememberMe(!rememberMe)}
                        ></div>
                        <span onClick={() => setRememberMe(!rememberMe)}><Trans i18nKey="login.rememberMe" /></span>
                    </div>
                </div>

                <div className="login_register_block">
                    <Trans i18nKey="login.firstTime" />{' '}
                    <button type="button" className="login_register_link" onClick={onRegisterClick}>
                        <Trans i18nKey="login.register" />
                    </button>
                </div>

                <div className="login_terms_block">
                    {t('login.terms')} <a href="/terms" target="_blank" rel="noopener noreferrer">{t('login.termsLink')}</a><br />
                    {t('login.privacyNotice')} <a href="/privacy" target="_blank" rel="noopener noreferrer">{t('login.privacyLink')}</a>{' '}
                    <a href="/cookies" target="_blank" rel="noopener noreferrer">{t('login.cookiesLink')}</a>
                </div>
            </div>
        </div>
    );
};