import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

export const Header = ({ isLoggedIn, onLoginClick, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogoutClick = () => {
        onLogout();
        setIsDropdownOpen(false);
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !event.target.closest('.header_profile_switch')
            ) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <header className="header">
            <div className="header_container">
                <div className="header_left">
                    <Link to="/" className="logo">
                        <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754083133/Logo.png" className="header_logo" alt="Логотип" />
                    </Link>

                    {!isSearchOpen ? (
                        <nav className="header_nav">
                            <NavLink to="/" end>Головна</NavLink>
                            <NavLink to="/catalog">Каталог</NavLink>
                            <NavLink to="/tv">TV шоу</NavLink>
                            <NavLink to="/new">Нове § Популярне</NavLink>
                            <NavLink to="/favorites">Обране</NavLink>
                        </nav>
                    ) : (
                        <div className="header_search_box">
                            <div className="header_search_bar">
                                <div className="header_search_left_icon" />
                                <input
                                    type="text"
                                    placeholder="Назва фільму, серіалу, ім’я актора, режисера"
                                    autoFocus
                                />
                            </div>

                            {isSearchOpen && (
                                <div className="header_search_results">
                                    <div className="header_search_films">
                                        <div className="header_film_card">
                                            <Link to="/film/1">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142247/Thebrothersunfilm.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>
                                        <div className="header_film_card">
                                            <Link to="/film/2">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142256/Spidermanfilm.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>
                                        <div className="header_film_card">
                                            <Link to="/film/3">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142262/Scobydoofilm.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>
                                        <div className="header_film_card">
                                            <Link to="/film/4">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142091/Suitsfilm.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>
                                        <div className="header_film_card">
                                            <Link to="/film/5">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142234/Monkfilm.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>
                                        <div className="header_film_card">
                                            <Link to="/film/6">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754142240/Dragon2film.png" className="header_films_preview" alt="Популярний фільм"  />
                                            </Link>
                                        </div>

                                    </div>

                                    <div className="header_search_actors">
                                        <div className="header_actor_card">
                                            <Link to="/actor/123">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754159030/Stathamactor.png" className="header_actor_preview" alt="Популярний актор"  />
                                                <p className="header_actor_name">Джейсон Стетхем</p>
                                                <p className="header_actor_role">Актор</p>
                                            </Link>
                                        </div>
                                        <div className="header_actor_card">
                                            <Link to="/actor/123">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754159112/DiCaprioactor.png" className="header_actor_preview" alt="Популярний актор"  />
                                                <p className="header_actor_name">Леонардо Ді Капріо</p>
                                                <p className="header_actor_role">Актор</p>
                                            </Link>
                                        </div>
                                        <div className="header_actor_card">
                                            <Link to="/actor/123">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754159069/Robbieactor.png" className="header_actor_preview" alt="Популярний актор"  />
                                                <p className="header_actor_name">Марго Роббі</p>
                                                <p className="header_actor_role">Актриса</p>
                                            </Link>
                                        </div>
                                        <div className="header_actor_card">
                                            <Link to="/actor/123">
                                                <img src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754159100/Pattinsonactor.png" className="header_actor_preview" alt="Популярний актор"  />
                                                <p className="header_actor_name">Роберт Паттінсон</p>
                                                <p className="header_actor_role">Актор</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="header_right">
                    <div
                        className="header_search"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        onMouseEnter={() => setIsSearchHovered(true)}
                        onMouseLeave={() => setIsSearchHovered(false)}
                    >
                        <div
                            className={`header_search_right_icon ${isSearchOpen ? 'open' : isSearchHovered ? 'hover' : ''}`}
                            onMouseEnter={() => setIsSearchHovered(true)}
                            onMouseLeave={() => setIsSearchHovered(false)}
                        />
                    </div>


                    <div className="header_premium">
                        <button> Оформити преміум </button>
                    </div>

                    <div className="header_promo">
                        <div className="header_promo_icon"/>
                        <span className="header_promo_text">Ввести промокод</span>
                    </div>

                    {!isLoggedIn ? (
                        <button onClick={onLoginClick} className="header_log_button">Війти</button>
                    ) : (
                        <div className="header_profile">
                            <div
                                onClick={toggleDropdown}
                                className="header_profile_switch"
                            >
                                <div
                                    className={`header_arrow ${isDropdownOpen ? 'open' : ''}`}
                                    aria-label={isDropdownOpen ? "Закрити меню" : "Відкрити меню"}
                                />

                                <div className="header_avatar" />
                            </div>

                            {isDropdownOpen && (
                                <div className="header_dropdown" ref={dropdownRef}>
                                    <ul>
                                        <li><Link to="/profile">Профіль</Link></li>
                                        <li><Link to="/settings">Налаштування</Link></li>
                                        <li><button onClick={handleLogoutClick}>Вийти</button></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};