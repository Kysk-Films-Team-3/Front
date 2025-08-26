import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotComplete.css';

export const ForgotComplete = ({ onClose, email }) => {
    const navigate = useNavigate();
    const forgotcompleteRef = useRef(null);

    const handleComplete = () => {
        onClose();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (forgotcompleteRef.current && !forgotcompleteRef.current.contains(event.target)) {
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
        <div className="forgot_complete_overlay" role="dialog" aria-modal="true">
            <div className="forgot_complete_modal" ref={forgotcompleteRef}>
                <div className="forgot_complete_close_icon" onClick={onClose}></div>
                <div className="forgot_complete_title">Обліковий запис відновлено</div>
                <div className="forgot_complete_subtitle">
                    Використовуйте цю електронну адресу для доступу до свого <br />
                    облікового запису:{" "}
                    <span className="forgot_complete_email">{email}</span>
                </div>

                <div className="forgot_complete_button_block">
                    <button
                        className="forgot_complete_button"
                        onClick={handleComplete}
                    >
                        Далі
                    </button>
                </div>
            </div>
        </div>
    );
};
