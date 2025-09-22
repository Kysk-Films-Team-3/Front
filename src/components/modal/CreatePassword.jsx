import React, { useState, useRef, useEffect, useContext } from 'react';
import './CreatePassword.css';
import { isValidPassword } from '../../validation/validation';
import { AuthContext } from '../../context/AuthContext';
import { Trans } from 'react-i18next';

export const CreatePassword = ({ isOpen, onClose, onPasswordCreated }) => {
    const { emailOrPhone, createPassword } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [noList, setNoList] = useState(false);
    const [errorKey, setErrorKey] = useState('');
    const createRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event) => {
            if (createRef.current && !createRef.current.contains(event.target)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setPassword('');
            setErrorKey('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        if (!isValidPassword(password)) {
            setErrorKey('createPassword.passwordError');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorKey('');
        if (!validate()) return;
        if (!emailOrPhone) {
            setErrorKey('createPassword.emailRequired');
            return;
        }
        const res = await createPassword(emailOrPhone, password);
        if (res.success) onPasswordCreated();
        else setErrorKey(res.message || 'createPassword.serverError');
    };

    const canSubmit = isValidPassword(password);

    return (
        <div className="create_overlay">
            <div className={`create_modal ${errorKey ? 'create_has-errors' : ''}`} ref={createRef}>
                <div className="create_close_icon" onClick={onClose}></div>

                <div className="create_title"><Trans i18nKey="createPassword.title" /></div>
                <div className="create_subtitle t-text-preline"><Trans i18nKey="createPassword.subtitle" /></div>

                <form className="create_form" onSubmit={handleSubmit}>
                    <div className="create_input_group create_password_container">
                        <input
                            type="text"
                            placeholder=" "
                            className={`create_input create_password_input ${errorKey ? 'create_error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label><Trans i18nKey="createPassword.passwordLabel" /></label>
                        {errorKey && (
                            <div className="create_error_text">
                                <div className="create_error_icon"></div>
                                <Trans i18nKey={errorKey} />
                            </div>
                        )}
                    </div>

                    <div className="create_button_container">
                        <button type="submit" className={`create_button ${canSubmit ? 'valid' : ''}`}>
                            <Trans i18nKey="createPassword.nextButton" />
                        </button>
                    </div>

                    <div className="create_form_list">
                        <label className="t-text-preline">
                            <div
                                className={`create_checkbox ${noList ? 'create_checked' : ''}`}
                                onClick={() => setNoList(!noList)}
                            >
                                <div className="create_checkbox_icon"></div>
                            </div>
                            <Trans i18nKey="createPassword.noList" />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};
