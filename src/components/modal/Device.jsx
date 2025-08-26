import React, { useEffect, useRef } from "react";
import "./Device.css";

export const Device = ({ onClose }) => {
    const deviceRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (deviceRef.current && !deviceRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="device_overlay" role="dialog" aria-modal="true">
            <div className="device_modal" ref={deviceRef}>
                <div className="device_header">
                    <button className="device_back_button" onClick={onClose}>
                        <div className="device_back_arrow"></div>
                        <div className="device_back_title">До налаштувань</div>
                    </button>
                    <div className="device_title">Пристрої</div>
                    <div className="device_counter">0/5</div>
                </div>
                <div className="device_block">
                    <div className="device_add_block">
                        <div className="device_description">
                            До облікового запису Kysk можна підключити до п'яти пристроїв.
                            Почніть перегляд на одному пристрої та продовжіть на іншому.
                        </div>
                        <button className="device_block_button" type="button">
                            <div className="device_plus_icon"></div>
                            <div>Додати телевізор</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
