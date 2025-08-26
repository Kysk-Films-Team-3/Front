import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationComplete.css';
export const RegistrationComplete = ({ onClose, email }) => {
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

    return (
        <div className="registration_complete_overlay" role="dialog" aria-modal="true">
            <div className="registration_complete_modal" ref={regcompleteRef}>
                <div className="registration_complete_close_icon" onClick={onClose}></div>
                <div className="registration_complete_title">Обліковий запис створено</div>
                <div className="registration_complete_subtitle">
                    Використовуйте цю електронну адресу для доступу до свого <br />
                    облікового запису:{" "}
                    <span className="registration_complete_email">{email}</span>
                </div>

                <div className="registration_complete_button_block">
                    <button
                        className="registration_complete_button"
                        onClick={handleComplete}
                    >
                        Далі
                    </button>
                </div>
            </div>
        </div>
    );
};
