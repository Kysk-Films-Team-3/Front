import React, { useState, useRef, useEffect, useContext } from 'react';
import { isValidEmailOrPhone } from '../../validation/validation';
import { AuthContext } from '../../context/AuthContext';
import { Trans } from 'react-i18next';
import './Forgot.css';

export const Forgot = ({ isOpen, onClose, onSuccess }) => {
    const { sendRecoveryCode } = useContext(AuthContext);

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [focused, setFocused] = useState(false);
    const [errorKey, setErrorKey] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setErrorKey('');

        const trimmed = emailOrPhone.trim();

        if (!trimmed || !isValidEmailOrPhone(trimmed)) {
            setErrorKey('forgot.emailError');
            return;
        }

        try {
            const res = await sendRecoveryCode(trimmed);
            if (res.success && typeof onSuccess === 'function') {
                onSuccess(trimmed);
            } else {
                setErrorKey(res.message || 'forgot.generalError');
            }
        } catch {
            setErrorKey('forgot.generalError');
        }
    };

    if (!isOpen) return null;

    const isFieldValid = isValidEmailOrPhone(emailOrPhone.trim());

    return (
        <div className="forgot_overlay">
            <div
                className={`forgot_modal ${submitted && errorKey ? 'has-error' : ''}`}
                ref={modalRef}
            >
                <div className="forgot_close_icon " onClick={onClose}></div>
                <div className="forgot_title"><Trans i18nKey="forgot.title" /></div>
                <div className="forgot_description t-text-preline">
                    <Trans i18nKey="forgot.description" />
                </div>
                <form className="forgot_form" onSubmit={handleSubmit}>
                    <div className="forgot_input_group">
                        <input
                            type="text"
                            placeholder=" "
                            className={`forgot_input ${submitted && errorKey ? 'error' : ''} ${focused ? 'focused' : ''}`}
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <label><Trans i18nKey="forgot.emailOrPhone" /></label>
                        {submitted && errorKey && (
                            <div className="forgot_error_text">
                                <div className="forgot_error_icon"></div>
                                <Trans i18nKey={errorKey} />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`forgot_button ${isFieldValid ? 'valid' : ''}`}
                    >
                        <Trans i18nKey="forgot.submit" />
                    </button>
                </form>
            </div>
        </div>
    );
};
