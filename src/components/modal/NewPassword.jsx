import React, { useState, useEffect, useRef } from 'react';
import { setForgotPasswordAPI } from '../../services/api';
import './NewPassword.css';

export const NewPassword = ({ isOpen, onClose, emailOrPhone, onPasswordCreated }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const newRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (newRef.current && !newRef.current.contains(event.target)) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setError('');

        if (!password || password.length < 4) {
            setError('Пароль має містити мінімум 4 символи');
            return;
        }
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }

        try {
            const res = await setForgotPasswordAPI(emailOrPhone, password);
            if (res.success && typeof onPasswordCreated === 'function') {
                localStorage.setItem('user', JSON.stringify({ emailOrPhone }));
                onPasswordCreated({ emailOrPhone });
            } else {
                setError(res.message || 'Сталася помилка');
            }
        } catch {
            setError('Сталася помилка. Спробуйте ще раз.');
        }
    };

    const isValid = password.length >= 4 && password === confirmPassword;

    return (
        <div className="new_overlay">
            <div className={`new_modal ${submitted && error ? 'new_has-errors' : ''}`} ref={newRef}>
                <div className="new_close_icon" onClick={onClose}></div>
                <div className="new_title">Створіть новий пароль</div>
                <div className="new_subtitle">
                    Щоб продовжити, створіть новий пароль, який не є вашим поточним
                </div>
                <form className="new_form" onSubmit={handleSubmit}>
                    <div className="new_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`new_input ${submitted && error ? 'new_error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Новий пароль</label>
                    </div>

                    <div className="new_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`new_input ${submitted && error ? 'new_error' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label>Повторити новий пароль</label>
                    </div>

                    {submitted && error && (
                        <div className="new_error_text">
                            <div className="new_error_icon"></div>
                            {error}
                        </div>
                    )}

                    <div className="new_button_container">
                        <button
                            type="submit"
                            className={`new_button ${isValid ? 'valid' : ''}`}
                        >
                            Продовжити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
