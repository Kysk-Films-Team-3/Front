import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Trans } from 'react-i18next';
import './ForgotComplete.css';

export const ForgotComplete = () => {
    const navigate = useNavigate();
    const forgotcompleteRef = useRef(null);
    const { closeModal, emailOrPhone } = useContext(AuthContext);

    const handleComplete = () => {
        closeModal();
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (forgotcompleteRef.current && !forgotcompleteRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [closeModal]);

    return (
        <div className="forgot_complete_overlay" role="dialog" aria-modal="true">
            <div className="forgot_complete_modal" ref={forgotcompleteRef}>
                <div className="forgot_complete_close_icon" onClick={closeModal}></div>

                <div className="forgot_complete_title">
                    <Trans i18nKey="forgotComplete.title" />
                </div>

                <div className="forgot_complete_subtitle t-text-preline">
                    <Trans i18nKey="forgotComplete.subtitle" values={{ email: emailOrPhone }} />
                </div>

                <div className="forgot_complete_button_block">
                    <button
                        className="forgot_complete_button"
                        onClick={handleComplete}
                    >
                        <Trans i18nKey="forgotComplete.button" />
                    </button>
                </div>
            </div>
        </div>
    );
};
