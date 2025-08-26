import { useState, useRef, useEffect } from 'react';
import './Login.css';
import { isValidEmailOrPhone, isValidPassword } from '../../validation/validation';
import { loginUserAPI, saveRememberMe, getRememberedUser } from '../../services/api';

export const Login = ({ isOpen, onClose, onForgot, onRegisterClick, onLoginSuccess }) => {
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

        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

        if (mockUsers.length > 0) {
            const usersText = mockUsers
                .map((u, i) => `${i + 1}. Email: ${u.emailOrPhone}, Password: ${u.password}`)
                .join('\n\n');

            console.log('mockUsers при открытии:', mockUsers);
            alert(`mockUsers:\n\n${usersText}`);
        }

        const rememberedUser = getRememberedUser();
        setEmailOrPhone(rememberedUser || '');
        setRememberMe(!!rememberedUser);
        setPassword('');
        setErrors({ emailOrPhone: '', password: '' });
    }, [isOpen]);

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
            newErrors.emailOrPhone = 'Будь ласка, введіть дійсну електронну адресу.';
            valid = false;
        }

        if (!isValidPassword(password)) {
            newErrors.password = 'Ваш пароль має містити від 4 до 60 символів.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsValid = validateFields();
        if (!fieldsValid) return;

        try {
            const response = await loginUserAPI(emailOrPhone, password);

            if (response.success) {
                saveRememberMe(emailOrPhone, rememberMe);
                localStorage.setItem('user', JSON.stringify(response.user));

                onLoginSuccess(response.user);
            } else {
                const apiErrors = { emailOrPhone: '', password: '' };
                const msg = response.message?.toLowerCase() || '';

                if (msg.includes('не знайдений') || msg.includes('not found')) {
                    apiErrors.emailOrPhone = response.message;
                } else if (msg.includes('пароль') || msg.includes('password')) {
                    apiErrors.password = response.message;
                } else {
                    apiErrors.password = response.message;
                }

                setErrors(apiErrors);
            }
        } catch {
            setErrors({ emailOrPhone: '', password: 'Помилка при спробі увійти' });
        }
    };

    const canSubmit = isValidEmailOrPhone(emailOrPhone) && isValidPassword(password);

    return (
        <div className="login_overlay" role="dialog" aria-modal="true">
            <div className={`login_modal ${errors.emailOrPhone || errors.password ? 'has-errors' : ''}`} ref={loginRef}>
                <div className="login_close_icon" onClick={onClose}></div>
                <div className="login_title">Вхід</div>

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
                        <label htmlFor="email">Адреса електронної пошти або мобільний телефон</label>
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
                        <label htmlFor="password">Пароль</label>
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
                                <span className={`login_eye_icon ${showPassword ? 'login_eye_closed'  : 'login_eye_open'}`} />
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
                        <button type="submit" className={`login_button ${canSubmit ? 'valid' : ''}`}>Увійти</button>
                    </div>
                </form>

                <div className="login_forgot_block">
                    <button type="button" className="login_forgot_link" onClick={onForgot}>Забули пароль?</button>
                </div>

                <div className="login_remember_block">
                    <div className="login_remember_wrapper">
                        <div className={`login_custom_checkbox ${rememberMe ? 'login_checked' : ''}`} onClick={() => setRememberMe(!rememberMe)}></div>
                        <span onClick={() => setRememberMe(!rememberMe)}>Запам'ятай мене</span>
                    </div>
                </div>

                <div className="login_register_block">
                    Вперше на KYSKFilms?{' '}
                    <button type="button" className="login_register_link" onClick={onRegisterClick}>
                        Створіть свій обліковий запис KYSK.
                    </button>
                </div>
                <div className="login_terms_block">
                    Продовжуючи, ви погоджуєтеся з KYSK{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">Умовами використання</a><br />
                    Будь ласка, перегляньте наші{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">Повідомлення про конфіденційність,</a>{' '}
                    <a href="/cookies" target="_blank" rel="noopener noreferrer">повідомлення про файли cookie та повідомлення про рекламу на основі інтересів.</a>
                </div>
            </div>
        </div>
    );
};
