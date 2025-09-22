import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation, Trans } from 'react-i18next';
import './SendCode.css';
import { isValidVerificationCode, isValidDigit, getVerificationCodeError } from '../../validation/validation';

export const SendCode = ({ isOpen, onClose, onCodeVerified }) => {
    useTranslation();
    const LENGTH = 5;
    const [code, setCode] = useState(new Array(LENGTH).fill(''));
    const [errors, setErrors] = useState({ code: '' });
    const [isValid, setIsValid] = useState(false);
    const inputsRef = useRef([]);
    const sendRef = useRef(null);

    const { emailOrPhone: email, setEmailOrPhone, sendRegistrationCode, verifyRegistrationCode } = useContext(AuthContext);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event) => {
            if (sendRef.current && !sendRef.current.contains(event.target)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && email) {
            sendRegistrationCode(email).then(res => {
                if (res.success) alert('Test code: ' + res.code); // не переводим alert
            });
            setCode(new Array(LENGTH).fill(''));
            setErrors({ code: '' });
        }
    }, [isOpen, email, sendRegistrationCode]);

    useEffect(() => {
        setIsValid(isValidVerificationCode(code, LENGTH));
    }, [code]);

    if (!isOpen) return null;

    const focusInput = (index) => {
        if (inputsRef.current[index]) inputsRef.current[index].focus();
    };

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (isValidDigit(val)) {
            const newCode = [...code];
            newCode[index] = val;
            setCode(newCode);
            setErrors({ code: '' });
            if (val !== '' && index < LENGTH - 1) focusInput(index + 1);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newCode = [...code];
            if (newCode[index] !== '') newCode[index] = '';
            else if (index > 0) {
                focusInput(index - 1);
                newCode[index - 1] = '';
            }
            setCode(newCode);
            setErrors({ code: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = getVerificationCodeError(code, LENGTH);
        if (errorMessage) {
            setErrors({ code: errorMessage });
            return;
        }
        const fullCode = code.join('');
        const res = await verifyRegistrationCode(email, fullCode);
        if (res.success) {
            setEmailOrPhone(email);
            onCodeVerified();
        } else setErrors({ code: res.message || 'Invalid code' });
    };

    const handleResendCode = async () => {
        const res = await sendRegistrationCode(email);
        if (res.success) alert('Test code: ' + res.code);
        setCode(new Array(LENGTH).fill(''));
        setErrors({ code: '' });
        setIsValid(false);
        setTimeout(() => focusInput(0), 100);
    };

    return (
        <div className="send_overlay">
            <div className={`send_modal ${errors.code ? 'has-errors' : ''}`} ref={sendRef}>
                <div className="send_close" onClick={onClose}></div>
                <div className="send_title t-text-preline">
                    <Trans i18nKey="sendCode.checkMailbox" />
                </div>
                <div className="send_description t-text-preline">
                    <Trans
                        i18nKey="sendCode.description"
                        values={{ email }}
                    />
                </div>
                <form className="send_form" onSubmit={handleSubmit} noValidate>
                    <div className="send_input_group">
                        {code.map((num, i) => (
                            <input
                                key={i}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                className={`send_input ${errors.code ? 'error' : ''}`}
                                value={num}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                ref={el => { inputsRef.current[i] = el; }}
                                autoFocus={i === 0}
                            />
                        ))}
                    </div>
                    {errors.code && <div className="send_error_text"><div className="send_error_icon"></div>{errors.code}</div>}
                    <button type="submit" className={`send_button ${isValid ? 'valid' : ''}`}>
                        <Trans i18nKey="sendCode.continue" />
                    </button>
                </form>
                <button className="send_resend" onClick={handleResendCode}>
                    <span className="send_refresh_icon"></span> <Trans i18nKey="sendCode.resend" />
                </button>
            </div>
        </div>
    );
};
