import React, { useState, useRef, useEffect, useContext } from 'react';
import './VerifyCode.css';
import { isValidDigit, isValidVerificationCode } from '../../validation/validation';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation, Trans } from 'react-i18next';

const LENGTH = 5;

export const VerifyCode = ({ isOpen, onClose, emailOrPhone, onVerified }) => {
    useTranslation();
    const { sendRecoveryCode, verifyRecoveryCode } = useContext(AuthContext);
    const [code, setCode] = useState(new Array(LENGTH).fill(''));
    const [error, setError] = useState('');
    const inputsRef = useRef([]);
    const verifyRef = useRef(null);

    useEffect(() => {
        if (isOpen && emailOrPhone) {
            setCode(new Array(LENGTH).fill(''));
            setError('');
            setTimeout(() => focusInput(0), 100);

            sendRecoveryCode(emailOrPhone).then(res => {
                if (res.success && res.code) {
                    alert('Тестовий код: ' + res.code);
                }
            });
        }
    }, [isOpen, emailOrPhone, sendRecoveryCode]);

    if (!isOpen) return null;

    const focusInput = (index) => {
        if (inputsRef.current[index]) inputsRef.current[index].focus();
    };

    const handleChange = (val, idx) => {
        if (isValidDigit(val)) {
            const newCode = [...code];
            newCode[idx] = val;
            setCode(newCode);
            setError('');
            if (val && idx < LENGTH - 1) focusInput(idx + 1);
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newCode = [...code];
            if (newCode[idx] !== '') newCode[idx] = '';
            else if (idx > 0) { focusInput(idx - 1); newCode[idx - 1] = ''; }
            setCode(newCode);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const fullCode = code.join('');

        try {
            const res = await verifyRecoveryCode(emailOrPhone, fullCode);
            if (res.success) {
                setCode(new Array(LENGTH).fill(''));
                onVerified();
            } else {
                setError(res.message || 'Невірний код');
            }
        } catch {
            setError('Сталася помилка. Спробуйте ще раз.');
        }
    };

    const handleResend = async () => {
        setError('');
        try {
            const res = await sendRecoveryCode(emailOrPhone);
            if (res.success && res.code) {
                alert('Тестовий код: ' + res.code);
            } else {
                setError(res.message || 'Не вдалося надіслати код');
            }
            setCode(new Array(LENGTH).fill(''));
            setTimeout(() => focusInput(0), 100);
        } catch {
            setError('Сталася помилка. Спробуйте ще раз.');
        }
    };

    const isCodeValid = isValidVerificationCode(code, LENGTH);

    return (
        <div className="verify_overlay">
            <div className={`verify_modal ${error ? 'has-error' : ''}`} ref={verifyRef}>
                <div className="verify_close" onClick={onClose}></div>
                <form className="verify_form" onSubmit={handleSubmit}>
                    <div className="verify_title"><Trans i18nKey="verifyCode.title" /></div>
                    <div className="verify_description">
                        <Trans i18nKey="verifyCode.description" values={{ email: emailOrPhone }}>
                        </Trans>
                    </div>
                    <div className="verify_input_group">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                ref={el => { inputsRef.current[idx] = el; }}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                className={`verify_input ${error ? 'error' : ''}`}
                                autoFocus={idx === 0}
                            />
                        ))}

                    </div>
                    {error && (
                        <div className="verify_error_text">
                            <div className="verify_error_icon"></div>
                            {error}
                        </div>
                    )}
                    <button type="submit" className={`verify_button ${isCodeValid ? 'valid' : ''}`}>
                        <Trans i18nKey="verifyCode.submit" />
                    </button>
                    <button type="button" className="verify_resend" onClick={handleResend}>
                        <span className="verify_refresh_icon"></span> <Trans i18nKey="verifyCode.resend" />
                    </button>
                </form>
            </div>
        </div>
    );
};
