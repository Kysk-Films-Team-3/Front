import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Trans, useTranslation } from 'react-i18next';
import './Logout.css';

export const Logout = () => {
    const { logout, closeModal } = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutRef = useRef(null);
    useTranslation();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            closeModal();
            navigate('/');
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (logoutRef.current && !logoutRef.current.contains(e.target)) {
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
        <div className="logout_overlay" role="dialog" aria-modal="true">
            <div className="logout_modal" ref={logoutRef}>
                <div className="logout_close" onClick={closeModal}></div>
                <div className="logout_text">
                    <div className="logout_title t-text-preline">
                        <Trans i18nKey="logout.confirmMessage" />
                    </div>
                    <div className="logout_description t-text-preline">
                        <Trans i18nKey="logout.description" />
                    </div>
                </div>
                <div className="logout_buttons">
                    <button className="logout_cancel_button" onClick={closeModal}>
                        <Trans i18nKey="logout.cancel" />
                    </button>
                    <button className="logout_exit_button" onClick={handleLogout}>
                        <Trans i18nKey="logout.exit" />
                    </button>
                </div>
            </div>
        </div>
    );
};
