import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SettingsPage.css';

export const SettingsPage = ({ user, onOpenLogoutModal, onPaymentClick, onDeviceClick }) => {
    const [isChildProtectionEnabled, setIsChildProtectionEnabled] = useState(false);
    const [isSportResultsEnabled, setIsSportResultsEnabled] = useState(false);

    return (
        <div className="settings_pages">
        <div className="settings_page">
            <div className="settings_header">
                <Link to="/" className="settings_back_button">
                    <div className="settings_back_icon"></div>
                    <div>До головної</div>
                </Link>
            </div>

            <div className="settings_container">
                <aside className="settings_sidebar">
                    <div className="settings_profile_block">
                        <div className="settings_profile_info">
                            <div className="settings_profile_details">
                                <div className="settings_profile_avatar"></div>
                                <div className="settings_profile_email">{user?.emailOrPhone}</div>
                            </div>
                            <div className="settings_arrow_email_icon"></div>
                        </div>

                    </div>

                    <div className="settings_block_title">Мої підписки</div>
                    <Link to="/Premium" className="settings_premium_link">
                    <div className="settings_subscriptions_block">
                        <div className="settings_subscription_content">
                            <div className="settings_subscription_status">Преміум</div>
                                <div className="settings_right_group">
                                    <button className="settings_manage_button">Підключити</button>
                                    <div className="settings_arrow_premium_icon"></div>
                                </div>
                        </div>
                    </div>
                    </Link>
                </aside>

                <main className="settings_main_content">
                    <div className="settings_row">
                        <div className="settings_card" onClick={onPaymentClick}>
                            <div className="settings_card_icon_container">
                                <div className="settings_card_icon settings_payment_icon"></div>
                                <div className="settings_card_content">
                                    <div className="settings_card_title">Спосіб оплати</div>
                                    <div className="settings_card_subtitle">Додати</div>
                                </div>
                            </div>
                            <div className="settings_arrow_pay_icon"></div>
                        </div>

                        <div className="settings_card" onClick={onDeviceClick}>
                            <div className="settings_card_icon_container">
                                <div className="settings_card_icon settings_devices_icon"></div>
                                <div className="settings_card_content">
                                    <div className="settings_card_title">Пристрої</div>
                                    <div className="settings_card_subtitle">Підключити</div>
                                </div>
                            </div>
                            <div className="settings_arrow_device_icon"></div>
                        </div>
                    </div>

                    <div className="settings_child_protection_section">
                        <div className="settings_section_header">
                            <div className="settings_section_title">Захист дітей</div>
                            <label className="settings_toggle_switch">
                                <input
                                    type="checkbox"
                                    checked={isChildProtectionEnabled}
                                    onChange={() => setIsChildProtectionEnabled(!isChildProtectionEnabled)}
                                />
                                <div className="settings_slider"></div>
                            </label>
                        </div>

                        <div className="settings_child_warning">
                            <div
                                className="settings_child_warning_icon"
                                style={{
                                    backgroundImage: isChildProtectionEnabled
                                        ? "url('https://res.cloudinary.com/da9jqs8yq/image/upload/v1756245941/Protection_happy.png')"
                                        : "url('https://res.cloudinary.com/da9jqs8yq/image/upload/v1756245939/Protection_Sad.png')",

                                }}
                            ></div>
                            <div className="settings_child_warning_text_container">
                                <div className="settings_child_warning_title">
                                    {isChildProtectionEnabled ? 'Захист дітей включений' : 'Захист дітей вимкнено'}
                                </div>
                                <div className="settings_child_warning_subtitle">
                                            Діти можуть самостійно здійснювати покупки, переходити у дорослий профіль та в Налаштування
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="settings_sport_section">
                        <div className="settings_section_header">
                            <div className="settings_section_title">Спорт</div>
                        </div>
                        <div className="settings_sport_row">
                            <div className="settings_section_subtitle">Показувати результати</div>
                            <label className="settings_toggle_switch">
                                <input
                                    type="checkbox"
                                    checked={isSportResultsEnabled}
                                    onChange={() => setIsSportResultsEnabled(!isSportResultsEnabled)}
                                />
                                <div className="settings_slider"></div>
                            </label>
                        </div>
                    </div>

                    <Link
                        to="/"
                        className="settings_logout_link"
                        onClick={(e) => {
                            e.preventDefault();
                            onOpenLogoutModal();
                        }}
                    >
                        <div className="settings_logout_block">
                            <div className="settings_logout_icon"></div>
                            <div>Вихід</div>
                        </div>
                    </Link>

                </main>

            </div>

        </div>
        </div>

    );
};