import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Logout.css';

export const Logout = ({ onClose }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        onClose();
        navigate('/');
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (logoutRef.current && !logoutRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className="logout_overlay" role="dialog" aria-modal="true">
            <div className="logout_modal" ref={logoutRef}>
                <div className="logout_close" onClick={onClose}></div>

                <div className="logout_text">
                    <div className="logout_title">
                        Точно хочеш вийти з облікового <br /> запису?
                    </div>
                    <div className="logout_description">
                        Акаунт буде видалено з устрою. Потрібен повторний <br />
                        вхід для доступу до рекомендацій, історії переглядів <br />
                        та управління підпискою
                    </div>
                </div>

                <div className="logout_buttons">
                    <button className="logout_cancel_button" onClick={onClose}>
                        Залишатися
                    </button>
                    <button className="logout_exit_button" onClick={handleLogout}>
                        Вийти
                    </button>
                </div>
            </div>
        </div>
    );
};
