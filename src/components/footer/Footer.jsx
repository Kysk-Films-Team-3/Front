import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_block">
                <div className="footer_divider"></div>
                <div className="footer_container">
            <div className="footer_top">
                <div className="footer_left">
                    <div className="footer_icons">
                        <div className="footer_telegram_icon"></div>
                        <div className="footer_facebook_icon"></div>
                        <div className="footer_instagram_icon"></div>
                        <div className="footer_x_icon"></div>
                    </div>

                    <div className="footer_help">
                        <button>Потрібна допомога?</button>
                    </div>
                </div>

                <div className="footer_columns">
                    <div className="footer_col">
                        <div className="footer_col_title">Kysk</div>
                        <div className="footer_col_links">
                            <Link to="/about" className="footer_col_link">О нас</Link>
                            <Link to="/careers" className="footer_col_link">Кар'єра в Kysk</Link>
                            <Link to="/agents" className="footer_col_link">Агенти Kysk</Link>
                        </div>
                    </div>
                    <div className="footer_col">
                        <div className="footer_col_title">Допомога</div>
                        <div className="footer_col_links">
                            <Link to="/faq" className="footer_col_link">Запитання та відповіді</Link>
                            <Link to="/devices" className="footer_col_link">Список пристроїв</Link>
                            <Link to="/distributors" className="footer_col_link">Дистриб'юторам</Link>
                            <Link to="/contacts" className="footer_col_link">Контакти</Link>
                        </div>
                    </div>
                    <div className="footer_col">
                        <div className="footer_col_title">Інше</div>
                        <div className="footer_col_links">
                            <Link to="/offers" className="footer_col_link">Акції та пропозиції</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer_bottom">
                <Link to="/" className="logo">
                    <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754083133/Logo.png" className="footer_logo" alt="Логотип" />
                </Link>
                <div className="footer_text">
                    <div className="footer_main_text">
                        <span className="footer_main_date"> © 2012-2025</span> ТОВ «Kysk»
                        <br />
                        Загальноукраїнські канали доступні для безкоштовного перегляду цілодобово
                        <br />
                        ПЗ ТОВ «Kysk» полягає у реєстрі вітчизняного ПЗ
                    </div>
                    <div className="footer_links_vertical">
                        <div className="footer_link_line">
                            <div className="footer_link_item">
                                <Link to="/terms" className="footer_link">Угода користувача</Link>
                                <div className="footer_link_arrow"></div>
                            </div>
                            <div className="footer_link_item">
                                <Link to="/privacy" className="footer_link">Політика конфіденційності</Link>
                                <div className="footer_link_arrow"></div>
                            </div>
                        </div>
                        <div className="footer_link_line">
                            <div className="footer_link_item">
                                <Link to="/rules" className="footer_link">На інформаційному ресурсі застосовуються рекомендаційні технології відповідно до Правил</Link>
                                <div className="footer_link_arrow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </footer>
    );
};