import React from "react";
import { Link } from "react-router-dom";
import { getAuthUser } from  '../services/api';
import "./Premium.css";

export const Premium = () => {
    const user = getAuthUser();
    const isLoggedIn = !!user;

    return (
        <div className="premium_page">
            <div className="premium_header">
                <Link
                    to={isLoggedIn ? "/settings" : "/"}
                    className="premium_back"
                >
                    <div className="premium_back_icon"></div>
                    {isLoggedIn ? "До налаштувань" : "До головної"}
                </Link>
            </div>

            <div className="premium_row">
                <div className="premium_title_line">
                    <div className="premium_title">Підтвердіть вибір</div>
                    <div className="premium_title">
                        Kysk +преміум
                        <div className="premium_price">15€</div>
                    </div>
                </div>

                <div className="premium_left">
                    <div className="premium_line">
                        <span className="premium_feature_text">
                            Більше <span className="premium_price">70 000</span> фільмів, серіалів та мультфільмів
                        </span>
                        <div className="premium_line_icon"></div>
                    </div>

                    <div className="premium_line">
                        <span className="premium_feature_text">
                            Каталог фільмів і серіалів Viju і Paramount
                        </span>
                        <div className="premium_line_icon"></div>
                    </div>

                    <div className="premium_line">
                        <span className="premium_feature_text">Батьківський контроль</span>
                        <div className="premium_line_icon"></div>
                    </div>

                    <div className="premium_line">
                        <span className="premium_feature_text">
                            Завантаження та перегляд без інтернету
                        </span>
                        <div className="premium_line_icon"></div>
                    </div>
                </div>
            </div>

            <div className="premium_button_container">
                <button className="premium_button">
                    Оформити
                </button>
            </div>
        </div>
    );
};
