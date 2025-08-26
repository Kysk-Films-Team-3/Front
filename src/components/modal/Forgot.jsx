import { useState, useRef, useEffect } from 'react';
import { isValidEmailOrPhone } from '../../validation/validation';
import { sendVerificationCodeAPI, getAllUsers } from '../../services/api';
import './Forgot.css';

export const Forgot = ({ isOpen, onClose, onSuccess }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden'; // блокировка прокрутки

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = ''; // разблокировка прокрутки
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setError('');

        const trimmed = emailOrPhone.trim();

        if (!trimmed || !isValidEmailOrPhone(trimmed)) {
            setError('Введіть коректний email або номер телефону');
            return;
        }

        const users = getAllUsers();
        const userExists = users.some(u => u.emailOrPhone === trimmed.toLowerCase());
        if (!userExists) {
            setError('Користувач з таким email або телефоном не знайдений');
            return;
        }

        try {
            const res = await sendVerificationCodeAPI(trimmed);
            if (res.success && typeof onSuccess === 'function') onSuccess(trimmed);
            else setError(res.message || 'Сталася помилка');
        } catch {
            setError('Сталася помилка. Спробуйте ще раз.');
        }
    };

    if (!isOpen) return null;

    const isFieldValid = isValidEmailOrPhone(emailOrPhone.trim());

    return (
        <div className="forgot_overlay">
            <div
                className={`forgot_modal ${submitted && error ? 'has-error' : ''}`}
                ref={modalRef}
            >
                <div className="forgot_close_icon" onClick={onClose}></div>
                <div className="forgot_title">Скинути пароль</div>
                <div className="forgot_description">
                    Введіть свою адресу електронної пошти або номер телефону, який ви використовуєте для свого облікового запису, щоб продовжити. Ми надішлемо вам код підтвердження для скидання пароля.
                </div>
                <form className="forgot_form" onSubmit={handleSubmit}>
                    <div className="forgot_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`forgot_input ${submitted && error ? 'error' : ''} ${focused ? 'focused' : ''}`}
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <label>Адреса електронної пошти або мобільний телефон</label>
                        {submitted && error && (
                            <div className="forgot_error_text">
                                <div className="forgot_error_icon"></div>
                                {error}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`forgot_button ${isFieldValid ? 'valid' : ''}`}
                    >
                        Продовжити
                    </button>
                </form>
            </div>
        </div>
    );
};
