import React from "react";
import { Link } from "react-router-dom";
import "./Premium.css";

export const Premium = () => {
    return (
        <div className="premium_page">
            <div className="premium_header">
                <Link to="/settings" className="premium_back">
                    <span className="backs_icon"></span> До налаштувань
                </Link>
            </div>

            <div className="premium_row">
                <div className="title_line">
                    <div className="premium_title">Підтвердіть вибір</div>
                    <div className="premium_title">
                        Kysk + преміум
                        <div className="premium_price">15€</div>
                    </div>
                </div>

                <div className="premium_left">
                    <div className="premium_line">
                        <span className="premium_feature_text">
                            Більше 70 000 фільмів, серіалів та мультфільмів
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

                <div className="premium_divider"></div>
            </div>

            <div className="premium_button_container">
                <button className="premium_button">
                    Оформити
                </button>
            </div>
        </div>
    );
};
