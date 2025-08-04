import React, { useState, useRef, useEffect } from 'react';
import './AccountRecovery.css';
import { isValidName, isValidLastName, isValidCardNumber,} from '../../validation/validation';

export const AccountRecovery = ({ isOpen, onClose, onBack }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
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
        if (firstName.trim() && lastName.trim() && cardNumber.trim() &&
            isValidName(firstName) && isValidLastName(lastName) && isValidCardNumber(cardNumber)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [firstName, lastName, cardNumber]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!isValidName(firstName)) {
            newErrors.firstName = "Ім'я обов'язкове";
        }
        if (!isValidLastName(lastName)) {
            newErrors.lastName = "Прізвище обов'язкове";
        }
        if (!isValidCardNumber(cardNumber)) {
            newErrors.cardNumber = "Невірний номер картки";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Форма отправлена:', { firstName, lastName, cardNumber });
        }
    };

    return (
        <div className="recovery_overlay">
            <div className="recovery_modal" ref={modalRef}>
                <button className="recovery_close" onClick={onClose}>
                    <div className="close_icon"></div>
                </button>
                <h2 className="recovery_title">Забули електронну пошту/пароль</h2>
                <p className="recovery_description">
                    Будь ласка, надайте цю інформацію, щоб допомогти нам знайти ваш обліковий запис
                    (усі поля обов'язкові для заповнення):
                </p>

                <form className="recovery_form" onSubmit={handleSubmit} noValidate>
                    <div className="recovery_input_group">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder=" "
                            className={`recovery_input ${errors.firstName ? 'error' : ''}`}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor="firstName">Ім'я в обліковому записі</label>
                        {errors.firstName && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {errors.firstName}
                            </div>
                        )}
                    </div>

                    <div className="recovery_input_group">
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder=" "
                            className={`recovery_input ${errors.lastName ? 'error' : ''}`}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="lastName">Прізвище у вашому обліковому записі</label>
                        {errors.lastName && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {errors.lastName}
                            </div>
                        )}
                    </div>

                    <div className="recovery_input_group">
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            placeholder=" "
                            className={`recovery_input ${errors.cardNumber ? 'error' : ''}`}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                        <label htmlFor="cardNumber">Номер кредитної або дебетової картки у файлі</label>
                        {errors.cardNumber && (
                            <div className="error_text">
                                <div className="error_icon"></div>
                                {errors.cardNumber}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`recovery_button ${isValid ? 'valid' : ''}`}
                    >
                        Продовжити
                    </button>
                </form>

                <button className="recovery_back" onClick={onBack}>
                    Скасувати
                </button>
            </div>
        </div>
    );
};