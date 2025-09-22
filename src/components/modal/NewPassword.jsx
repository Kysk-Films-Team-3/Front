import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation, Trans } from 'react-i18next';
import './NewPassword.css';
import { isValidPassword } from '../../validation/validation';

export const NewPassword = ({ isOpen, onClose, onPasswordCreated }) => {
    useTranslation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const newRef = useRef(null);

    const { emailOrPhone, createPassword } = useContext(AuthContext);

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

        const trimmedPassword = password.trim();
        const trimmedConfirm = confirmPassword.trim();

        if (!isValidPassword(trimmedPassword)) {
            setError('Password error');
            return;
        }

        if (trimmedPassword !== trimmedConfirm) {
            setError('Passwords do not match');
            return;
        }

        if (!emailOrPhone) {
            setError('Email required');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const currentUser = storedUsers.find(u => u.emailOrPhone === emailOrPhone);
        if (currentUser && currentUser.password === trimmedPassword) {
            setError('New password is same as current');
            return;
        }

        try {
            const res = await createPassword(emailOrPhone, trimmedPassword);
            if (res.success) {
                setPassword('');
                setConfirmPassword('');
                onPasswordCreated();
            } else {
                setError(res.message || 'Server error');
            }
        } catch {
            setError('Server error');
        }
    };

    const isValid = isValidPassword(password.trim()) && password === confirmPassword;

    return (
        <div className="new_overlay">
            <div className={`new_modal ${submitted && error ? 'new_has-errors' : ''}`} ref={newRef}>
                <div className="new_close_icon" onClick={onClose}></div>
                <div className="new_title"><Trans i18nKey="newPassword.title" /></div>
                <div className="new_subtitle"><Trans i18nKey="newPassword.subtitle" /></div>
                <form className="new_form" onSubmit={handleSubmit}>
                    <div className="new_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`new_input ${submitted && error ? 'new_error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label><Trans i18nKey="newPassword.passwordLabel" /></label>
                    </div>

                    <div className="new_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`new_input ${submitted && error ? 'new_error' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label><Trans i18nKey="newPassword.confirmPasswordLabel" /></label>
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
                            <Trans i18nKey="newPassword.submit" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
