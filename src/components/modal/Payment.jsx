import React, { useEffect, useState, useRef } from "react";
import "./Payment.css";

export const Payment = ({ onClose }) => {
    const accountNumber = "4 4589 3352";
    const balance = 0;
    const [copied, setCopied] = useState(false);
    const paymentRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (paymentRef.current && !paymentRef.current.contains(event.target)) {
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
        <div className="payment_overlay" role="dialog" aria-modal="true">
            <div className="payment_modal" ref={paymentRef}>
                <div className="payment_header">
                    <button className="payment_back_button" onClick={onClose}>
                        <div className="payment_back_arrow"></div>
                        <div className="payment_back_title">До налаштувань</div>
                    </button>
                    <div className="payment_title">Оплата</div>
                </div>
                <div className="payment_block">
                    <div className="payment_info_block">
                        <div className="payment_block_title">Інформація про рахунок</div>
                        <div className="payment_info_line">
                            <div className="payment_info_label">Номер рахунку Kysk</div>
                            <div className="payment_card_number">
                                {accountNumber}
                                <button className="payment_copy_button" onClick={handleCopy}></button>
                            </div>
                        </div>
                        <hr className="payment_divider" />
                        <div className="payment_info_line">
                            <div className="payment_info_label">Баланс</div>
                            <div className="payment_info_value"><span className="payment_info_balance">{balance}</span>UAH</div>
                        </div>
                    </div>
                    <div className="payment_card_block">
                        <div className="payment_block_title">Банківські картки</div>
                        <button className="payment_card_button">
                            <div className="payment_plus_icon"></div>
                            <span>Додати карту</span>
                        </button>
                    </div>
                    {copied && <div className="payment_tooltip"></div>}
                </div>
            </div>
        </div>
    );
};
