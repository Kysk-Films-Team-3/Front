import React, { useState, useRef, useEffect } from 'react';
import './ForgotPassword.css';
import { isValidEmailOrPhone } from '../../validation/validation';
export const ForgotPassword = ({ isOpen, onClose, onForgotEmailOrPasswordOpen, onConfirmCodeOpen }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const inputRef = useRef(null);
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

    useEffect(() => {
        if (emailOrPhone.trim() && isValidEmailOrPhone(emailOrPhone)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [emailOrPhone]);

    if (!isOpen) return null;

    const handleFocus = () => setFocused(true);

    const handleBlur = (e) => {
        if (e.relatedTarget === inputRef.current) return;
        setFocused(false);
    };

    const validate = () => {
        if (!emailOrPhone.trim()) {
            setError("Поле не може бути порожнім");
            return false;
        }
        if (!isValidEmailOrPhone(emailOrPhone)) {
            setError("Введіть коректний email або номер телефону");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onConfirmCodeOpen();
        }
    };

    return (
        <div className="forgot_overlay">
            <div className="forgot_modal" ref={modalRef}>
                <button className="forgot_close" onClick={onClose}>
                    <div className="forgot_close_icon"></div>
                </button>
                <h2 className="forgot_title">Скинути пароль</h2>
                <p className="forgot_description">
                    Введіть свою адресу електронної пошти або номер телефону, який ви
                    використовуєте для свого облікового запису, щоб продовжити. Ми надішлемо вам
                    код підтвердження для скидання пароля.
                </p>
                <form className="forgot_form" onSubmit={handleSubmit} noValidate>
                    <div className="forgot_input_group" style={{ position: 'relative' }}>
                        <input
                            ref={inputRef}
                            type="text"
                            id="emailOrPhone"
                            placeholder=" "
                            className={`forgot_input ${error ? 'error' : ''} ${focused ? 'focused' : ''}`}
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            autoComplete="username"
                            required
                        />
                        <label htmlFor="emailOrPhone">Адреса електронної пошти або мобільний телефон</label>
                        {error && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {error}
                            </div>
                        )}
                    </div>
                    <button type="submit" className={`forgot_button ${isValid ? 'valid' : ''}`}>Продовжити</button>
                </form>
                <button className="forgot_Email" onClick={onForgotEmailOrPasswordOpen}>Я не пам'ятаю свою електронну пошту чи телефон.</button>
            </div>
        </div>
    );
};