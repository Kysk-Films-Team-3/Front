import React, { useState, useRef, useEffect } from 'react';
import {
    isValidVerificationCode,
    isValidDigit,
    getVerificationCodeError
} from '../../validation/validation';
import './VerifyCode.css';

export const VerifyCode = ({ isOpen, onClose, onResendCode }) => {
    const LENGTH = 5;
    const [code, setCode] = useState(new Array(LENGTH).fill(''));
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const inputsRef = useRef([]);
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
        setIsValid(isValidVerificationCode(code, LENGTH));
    }, [code]);

    if (!isOpen) return null;

    const focusInput = (index) => {
        if (inputsRef.current[index]) {
            inputsRef.current[index].focus();
        }
    };

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (isValidDigit(val)) {
            const newCode = [...code];
            newCode[index] = val;
            setCode(newCode);
            setError('');
            if (val !== '' && index < LENGTH - 1) {
                focusInput(index + 1);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newCode = [...code];
            if (newCode[index] !== '') {
                newCode[index] = '';
                setCode(newCode);
                setError('');
            } else if (index > 0) {
                focusInput(index - 1);
                newCode[index - 1] = '';
                setCode(newCode);
                setError('');
            }
        }
        else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then(text => {
                const digits = text.replace(/\D/g, '').slice(0, LENGTH);
                if (digits.length > 0) {
                    const newCode = [...code];
                    for (let i = 0; i < LENGTH && i < digits.length; i++) {
                        newCode[i] = digits[i];
                    }
                    setCode(newCode);
                    setError('');
                    const nextIndex = Math.min(digits.length, LENGTH - 1);
                    focusInput(nextIndex);
                }
            });
        }
    };

    const validate = () => {
        const errorMessage = getVerificationCodeError(code, LENGTH);
        if (errorMessage) {
            setError(errorMessage);
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const fullCode = code.join('');
            console.log('Код підтверджено: ' + fullCode);
        }
    };

    const handleResendCode = () => {
        if (onResendCode) {
            onResendCode();
        }
        setCode(new Array(LENGTH).fill(''));
        setError('');
        setIsValid(false);
        setTimeout(() => focusInput(0), 100);
    };

    return (
        <div className="verify_overlay">
            <div className="verify_modal" ref={modalRef}>
                <button className="verify_close" onClick={onClose}>✕</button>

                <h2 className="verify_title">Скинути пароль</h2>

                <p className="verify_description">
                    Щоб продовжити, виконайте цей крок підтвердження. Ми надіслали одноразовий
                    пароль на електронну адресу something@gmail.com. Будь ласка, введіть його
                    нижче.
                </p>

                <form className="verify_form" onSubmit={handleSubmit} noValidate>
                    <div className="verify_input_group">
                        {code.map((num, i) => (
                            <input
                                key={i}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                className={`verify_input ${error ? 'error' : ''}`}
                                value={num}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                ref={el => { inputsRef.current[i] = el; }}
                                autoFocus={i === 0}
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="verify_error_text">
                            <div className="verify_error_icon"></div>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`verify_button ${isValid ? 'valid' : ''}`}
                    >
                        Продовжити
                    </button>
                </form>

                <button className="verify_resend" onClick={handleResendCode}>
                    <div className="verify_refresh_icon"></div>
                    Надіслати код повторно
                </button>
            </div>
        </div>
    );
};