import React, { useState, useEffect, useRef, useContext } from 'react';
import './Profile.css';
import { AuthContext } from '../../context/AuthContext';

export const Profile = ({ onClose }) => {
    const { user } = useContext(AuthContext);
    const profileRef = useRef(null);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || user.emailOrPhone.split('@')[0]);
            setLastName(user.lastName || '');
            setNickname(user.nickname || '');
        }
    }, [user]);

    const handleSave = () => {
        if (!canSave) return;

        const updatedProfile = {
            name: name,
            lastName: lastName,
            nickname: nickname,
        };
        console.log('Дані для збереження:', updatedProfile);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
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

    const canSave = name.trim() !== '' && lastName.trim() !== '' && nickname.trim() !== '';

    if (!user) return null;

    return (
        <div className="profile_overlay" role="dialog" aria-modal="true">
            <div className="profile_modal" ref={profileRef}>
                <div className="profile_close_icon" onClick={onClose}></div>
                <div className="profile_title">Редагування профілю</div>
                <div className="profile_content">
                    <div className="profile_avatar"></div>
                    <div className="profile_inputs_wrapper">
                        <div className="profile_input_block">
                            <input
                                type="text"
                                id="profileName"
                                placeholder=" "
                                className="profile_input"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <label htmlFor="profileName">Ім'я</label>
                        </div>
                        <div className="profile_input_block">
                            <input
                                type="text"
                                id="profileLastName"
                                placeholder=" "
                                className="profile_input"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <label htmlFor="profileLastName">Прізвище</label>
                        </div>
                        <div className="profile_input_block">
                            <input
                                type="text"
                                id="profileNickname"
                                placeholder=" "
                                className="profile_input"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                            />
                            <label htmlFor="profileNickname">Нікнейм</label>
                        </div>
                    </div>
                </div>
                <div className="profile_button_block">
                    <button className="profile_button_exit" onClick={onClose}>Вийти</button>
                    <button
                        className={`profile_button_save ${canSave ? 'active' : ''}`}
                        onClick={handleSave}
                        disabled={!canSave}
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
};