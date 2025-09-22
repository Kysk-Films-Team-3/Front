import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationComplete.css';
import { AuthContext } from '../../context/AuthContext';
import { Trans } from 'react-i18next';

export const RegistrationComplete = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const regcompleteRef = useRef(null);

    const handleComplete = () => {
        onClose();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (regcompleteRef.current && !regcompleteRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!user) return null;

    return (
        <div className="registration_complete_overlay" role="dialog" aria-modal="true">
            <div className="registration_complete_modal" ref={regcompleteRef}>
                <div className="registration_complete_close_icon" onClick={onClose}></div>
                <div className="registration_complete_title">
                    <Trans i18nKey="registrationComplete.title" />
                </div>
                <div className="registration_complete_subtitle t-text-preline">
                    <Trans
                        i18nKey="registrationComplete.subtitle"
                        values={{ email: user.emailOrPhone }}
                    />
                </div>

                <div className="registration_complete_button_block">
                    <button
                        className="registration_complete_button"
                        onClick={handleComplete}
                    >
                        <Trans i18nKey="registrationComplete.button" />
                    </button>
                </div>
            </div>
        </div>
    );
};
