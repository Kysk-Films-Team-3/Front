import React, { useState, useRef, useEffect } from 'react';
import { isValidEmailOrPhone, isValidPassword } from '../../validation/validation';
import './Login.css';
export const Login = ({ isOpen, onClose, onLogin, onForgot }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });
    const passwordInputRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleFocus = () => setFocused(true);

    const handleBlur = (e) => {
        const related = e.relatedTarget;
        if (related === passwordInputRef.current || related === toggleButtonRef.current) return;
        setFocused(false);
    };

    const handleToggleClick = () => {
        setShowPassword((show) => !show);
        passwordInputRef.current?.focus();
    };

    const validate = () => {
        const newErrors = { emailOrPhone: '', password: '' };
        let valid = true;

        if (!isValidEmailOrPhone(emailOrPhone.trim())) {
            newErrors.emailOrPhone = 'Введіть коректний email або номер телефону';
            valid = false;
        }

        if (!isValidPassword(password)) {
            newErrors.password = 'Ваш пароль має містити від 4 до 60 символів.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setErrors({ emailOrPhone: '', password: '' });
            onLogin({ emailOrPhone, password });
        }
    };

    return (
        <div className="login_overlay">
            <div className="login_modal" ref={modalRef}>
                <button className="login_close" onClick={onClose}>
                    <div className="login_close_icon"></div>
                </button>
                <h2 className="login_title">Вхід</h2>
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="login_input_group" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            className={`login_input ${errors.emailOrPhone ? 'error' : ''}`}
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            autoComplete="username"
                        />
                        <label htmlFor="email">Адреса електронної пошти або мобільний телефон</label>
                        {errors.emailOrPhone && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {errors.emailOrPhone}
                            </div>
                        )}
                    </div>

                    <div className="login_input_group password_input_container" style={{ position: 'relative' }}>
                        <input
                            ref={passwordInputRef}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder=" "
                            className={`login_input password_input ${errors.password ? 'error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoComplete="current_password"
                        />
                        <label htmlFor="password">Пароль</label>
                        {focused && (
                            <button
                                ref={toggleButtonRef}
                                type="button"
                                className="toggle_password"
                                onClick={handleToggleClick}
                                tabIndex={-1}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                aria-label={showPassword ? 'Приховати пароль' : 'Показати пароль'}
                            >
                                <div className={`eye_icon ${showPassword ? 'eye_closed' : 'eye_open'}`}></div>
                            </button>
                        )}
                        {errors.password && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="login_button">Увійти</button>
                    <button type="button" className="forgot_link" onClick={onForgot}>Забули пароль?</button>
                    <div className="login_info_group">
                        <div className="login_remember">
                            <label>
                                <div className={`custom_checkbox ${rememberMe ? 'checked' : ''}`} onClick={() => setRememberMe(!rememberMe)}>
                                    <div className="checkbox_icon"></div>
                                </div>
                                Remember Me
                            </label>
                        </div>
                        <div className="login_register">
                            New to KYSKFilms?{' '}
                            <button type="button" className="register_link" onClick={() => alert('Реєстрація буде реалізована пізніше')}>
                                Створіть свій обліковий запис KYSK.
                            </button>
                        </div>
                        <div className="login_terms">
                            By continuing, you agree to the KYSK{' '}
                            <a href="/terms" target="_blank" rel="noopener noreferrer">Conditions of Use.</a> Please see our<br />
                            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice,</a>{' '}
                            <a href="/cookies" target="_blank" rel="noopener noreferrer">Cookie Notice</a>{' '}
                            and{' '}
                            <a href="/ads" target="_blank" rel="noopener noreferrer">Interest-Based Ads Notice</a>.
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};