import React, { useState, useRef, useEffect } from 'react';
import './Registration.css';
import { isValidEmailOrPhone } from '../../validation/validation';
import { saveRememberMe, getRememberedUser, fakeRegisterEmail } from '../../services/api';

export const Registration = ({ isOpen, onClose, onRegisterSuccess }) => {
    const [email, setEmail] = useState(getRememberedUser() || '');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [rememberMe, setRememberMe] = useState(!!getRememberedUser());
    const registrationRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (registrationRef.current && !registrationRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleStart = async () => {
        setSubmitted(true);
        setError('');

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !isValidEmailOrPhone(trimmedEmail)) {
            setError('Введіть коректний email або номер телефону');
            return;
        }

        try {
            const response = await fakeRegisterEmail(trimmedEmail);
            if (response.success) {
                saveRememberMe(trimmedEmail, rememberMe);
                onRegisterSuccess(trimmedEmail);
            } else {
                setError(response.message || 'Помилка реєстрації');
            }
        } catch {
            setError('Помилка при зв\'язку з сервером');
        }
    };

    const isFieldValid = isValidEmailOrPhone(email.trim());

    return (
        <div className="registration_overlay">
            <div
                className={`registration_modal ${submitted && error ? 'has-error' : ''}`}
                ref={registrationRef}
            >
                <div className="registration_close_icon" onClick={onClose}></div>
                <div className="registration_title">Реєстрація</div>
                <div className="registration_subtitle">
                    Готові дивитися? Введіть свою електронну адресу або <br /> мобільний телефон щоб створити акаунт.
                </div>

                <div className="registration_form">
                    <div className="registration_input_block">
                        <input
                            type="text"
                            id="email"
                            placeholder=" "
                            className={`registration_input ${submitted && error ? 'error' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                        <label htmlFor="email">Адреса електронної пошти або мобільний телефон</label>
                        {submitted && error && (
                            <div className="registration_error_text">
                                <div className="registration_error_icon"></div>
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="registration_block">
                        <button
                            type="button"
                            className={`registration_button ${isFieldValid ? 'valid' : ''}`}
                            onClick={handleStart}
                        >
                            Почати
                        </button>
                    </div>

                    <div className="registration_remember">
                        <label>
                            <div
                                className={`registration_custom_checkbox ${rememberMe ? 'checked' : ''}`}
                                onClick={() => setRememberMe(!rememberMe)}
                            >
                                <div className="registration_checkbox_icon"></div>
                            </div>
                            Запам'ятай мене
                        </label>
                    </div>
                </div>

                <div className="registration_terms">
                    Продовжуючи, ви погоджуєтеся з KYSK{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">Умовами використання</a> <br />
                    Будь ласка, перегляньте наші{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">Повідомлення про конфіденційність</a>{' '}
                    <a href="/cookies" target="_blank" rel="noopener noreferrer">повідомлення про файли cookie та повідомлення про рекламу на основі інтересів.</a>.
                </div>
            </div>
        </div>
    );
};
