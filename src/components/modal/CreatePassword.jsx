import React, { useState, useRef, useEffect } from 'react';
import './CreatePassword.css';
import { setPasswordAPI } from '../../services/api';

export const CreatePassword = ({ isOpen, onClose, email, onPasswordCreated }) => {
    const [password, setPassword] = useState('');
    const [noList, setNoList] = useState(false);
    const [errors, setErrors] = useState({ password: '' });
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

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = { password: '' };
        let valid = true;

        if (!password || password.length < 4 || password.length > 60) {
            newErrors.password = 'Пароль має містити від 4 до 60 символів';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await setPasswordAPI(email, password);
            if (response.success) {
                localStorage.setItem('user', JSON.stringify({ emailOrPhone: email }));
                onPasswordCreated({ emailOrPhone: email });
            } else {
                setErrors({ password: response.message || 'Помилка при створенні пароля' });
            }
        } catch {
            setErrors({ password: 'Помилка при створенні пароля' });
        }
    };

    const canSubmit = password.length >= 4 && password.length <= 60;

    return (
        <div className="create_overlay">
            <div className={`create_modal ${errors.password ? 'create_has-errors' : ''}`} ref={createRef}>
                <div className="create_close_icon" onClick={onClose}></div>
                <div className="create_title">Створіть пароль, щоб розпочати членство</div>
                <div className="create_subtitle">
                    Ще кілька кроків, і все готово! <br/>
                    Ми теж ненавидимо паперову роботу.
                </div>

                <form className="create_form" onSubmit={handleSubmit}>
                    <div className="create_input_group create_password_container">
                        <input
                            type="text"
                            id="create_password"
                            placeholder=" "
                            className={`create_input create_password_input ${errors.password ? 'create_error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="create_password">Пароль</label>
                        {errors.password && (
                            <div className="create_error_text">
                                <div className="create_error_icon"></div>
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="create_button_container">
                        <button type="submit" className={`create_button ${canSubmit ? 'valid' : ''}`}>
                            Далі
                        </button>
                    </div>

                    <div className="create_form_list">
                        <label>
                            <div
                                className={`create_checkbox ${noList ? 'create_checked' : ''}`}
                                onClick={() => setNoList(!noList)}
                            >
                                <div className="create_checkbox_icon"></div>
                            </div>
                            Будь ласка, не надсилайте мені електронні листи зі <br/> спеціальними пропозиціями KYSK
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};
