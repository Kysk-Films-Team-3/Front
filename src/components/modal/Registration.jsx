import React, { useState, useRef, useEffect, useContext } from 'react';
import './Registration.css';
import { isValidEmailOrPhone } from '../../validation/validation';
import { AuthContext } from '../../context/AuthContext';
import { Trans, useTranslation } from 'react-i18next';

export const Registration = ({ isOpen, onClose, onRegisterSuccess }) => {
    const { t } = useTranslation();
    const { startRegistration } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
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

    useEffect(() => {
        if (!isOpen) return;
        setEmail('');
        setError('');
        setSubmitted(false);
        setRememberMe(false);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleStart = async () => {
        setSubmitted(true);
        setError('');

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !isValidEmailOrPhone(trimmedEmail)) {
            setError('Please enter a valid email address or phone number.');
            return;
        }

        try {
            const response = await startRegistration(trimmedEmail, rememberMe);
            if (response.success) {
                onRegisterSuccess?.(trimmedEmail);
            } else {
                setError(response.message || 'Registration error');
            }
        } catch {
            setError('Error connecting to the server');
        }
    };

    const isFieldValid = isValidEmailOrPhone(email.trim());

    return (
        <div className="registration_overlay">
            <div className={`registration_modal ${submitted && error ? 'has-error' : ''}`} ref={registrationRef}>
                <div className="registration_close_icon" onClick={onClose}></div>

                <div className="registration_title">
                    <Trans i18nKey="registration.title" />
                </div>
                <div className="registration_subtitle t-text-preline">
                    <Trans i18nKey="registration.subtitle" />
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
                        <label htmlFor="email">
                            <Trans i18nKey="registration.emailOrPhone" />
                        </label>
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
                            <Trans i18nKey="registration.startButton" />
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
                            <Trans i18nKey="registration.rememberMe" />
                        </label>
                    </div>
                </div>

                <div className="registration_terms">
                    {t('registration.terms')} <a href="/terms" target="_blank" rel="noopener noreferrer">{t('registration.termsLink')}</a><br />
                    {t('registration.privacyNotice')} <a href="/privacy" target="_blank" rel="noopener noreferrer">{t('registration.privacyLink')}</a>{' '}
                    <a href="/cookies" target="_blank" rel="noopener noreferrer">{t('registration.cookiesLink')}</a>
                </div>
            </div>
        </div>
    );
};
