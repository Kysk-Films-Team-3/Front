import React, { useState, useRef, useEffect } from 'react';
import './VerifyCode.css';
import {
    isValidDigit,
    isValidVerificationCode,
    getVerificationCodeError
} from '../../validation/validation';

const LENGTH = 5;

export const VerifyCode = ({ isOpen, onClose, emailOrPhone, onVerified }) => {
    const [code, setCode] = useState(new Array(LENGTH).fill(''));
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const inputsRef = useRef([]);
    const verifyRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (verifyRef.current && !verifyRef.current.contains(event.target)) onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && emailOrPhone) {
            const newVerifyCode = Array.from({ length: LENGTH }, () => Math.floor(Math.random() * 10)).join('');
            setGeneratedCode(newVerifyCode);
            alert(`Тестовий код: ${newVerifyCode}`);
            setCode(new Array(LENGTH).fill(''));
            setError('');
            setSubmitted(false);
            setTimeout(() => focusInput(0), 100);
        }
    }, [isOpen, emailOrPhone]);

    if (!isOpen) return null;

    const focusInput = (index) => {
        if (inputsRef.current[index]) inputsRef.current[index].focus();
    };

    const handleChange = (value, index) => {
        if (isValidDigit(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setError('');
            if (value && index < LENGTH - 1) focusInput(index + 1);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newCode = [...code];
            if (newCode[index] !== '') {
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                focusInput(index - 1);
                newCode[index - 1] = '';
                setCode(newCode);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const errorMessage = getVerificationCodeError(code, LENGTH);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const entered = code.join('');
        if (entered === generatedCode) {
            onVerified();
        } else {
            setError('Невірний код');
        }
    };

    const handleResend = () => {
        const newCode = Array.from({ length: LENGTH }, () => Math.floor(Math.random() * 10)).join('');
        setGeneratedCode(newCode);
        alert(`Тестовий код: ${newCode}`);
        setCode(new Array(LENGTH).fill(''));
        setError('');
        setSubmitted(false);
        setTimeout(() => focusInput(0), 100);
    };

    const isCodeValid = isValidVerificationCode(code, LENGTH);

    return (
        <div className="verify_overlay">
            <div className={`verify_modal ${submitted && error ? 'has-error' : ''}`} ref={verifyRef}>
                <div className="verify_close" onClick={onClose}></div>
                <form className="verify_form" onSubmit={handleSubmit}>
                    <div className="verify_title">Скинути пароль</div>
                    <div className="verify_description">
                        Щоб продовжити, виконайте цей крок підтвердження. Ми надіслали одноразовий пароль на електронну адресу {" "}
                        <span className="verify_email">{emailOrPhone}.</span> Будь ласка, введіть його <br/> нижче.
                    </div>
                    <div className="verify_input_group">
                        {code.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => (inputsRef.current[idx] = el)}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                className={`verify_input ${submitted && error ? 'error' : ''}`}
                            />
                        ))}
                    </div>
                    {submitted && error && (
                        <div className="verify_error_text">
                            <div className="verify_error_icon"></div>
                            {error}
                        </div>
                    )}
                    <button type="submit" className={`verify_button ${isCodeValid ? 'valid' : ''}`}>
                        Підтвердити
                    </button>
                    <button type="button" className="verify_resend" onClick={handleResend}>
                        <span className="verify_refresh_icon"></span>
                        Надіслати код повторно
                    </button>
                </form>
            </div>
        </div>
    );
};
