import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Header.css';
import { getPopularFilms, getPopularActors } from '../../services/api';

export const Header = ({ onLoginClick, user }) => {
    const location = useLocation();
    const isPremiumPage = location.pathname === '/Premium';

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ films: [], actors: [] });

    const [popularFilms, setPopularFilms] = useState([]);
    const [popularActors, setPopularActors] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const films = await getPopularFilms();
                const actors = await getPopularActors();
                setPopularFilms(films);
                setPopularActors(actors);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleMenuItemClick = () => setIsDropdownOpen(false);

    const performSearch = (query) => {
        if (!query) {
            setSearchResults({ films: [], actors: [] });
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        const filteredFilms = popularFilms.filter(film =>
            film.title.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredActors = popularActors.filter(actor =>
            actor.name.toLowerCase().includes(lowerCaseQuery)
        );

        const sortedFilms = filteredFilms.sort((a, b) => {
            const aStartsWith = a.title.toLowerCase().startsWith(lowerCaseQuery);
            const bStartsWith = b.title.toLowerCase().startsWith(lowerCaseQuery);
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.title.localeCompare(b.title);
        });

        const sortedActors = filteredActors.sort((a, b) => {
            const aStartsWith = a.name.toLowerCase().startsWith(lowerCaseQuery);
            const bStartsWith = b.name.toLowerCase().startsWith(lowerCaseQuery);
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.name.localeCompare(b.name);
        });

        setSearchResults({ films: sortedFilms, actors: sortedActors });
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        performSearch(query);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery('');
            setSearchResults({ films: [], actors: [] });
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.header_profile_switch')) {
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

    const showPopular = searchQuery === '';

    return (
        <header className="header">
            <div className="header_container">
                <div className="header_left">
                    <Link to="/" className="logo">
                        <img
                            src="https://res.cloudinary.com/da9jqs8yq/image/upload/v1754083133/Logo.png"
                            className="header_logo"
                            alt="Логотип"
                        />
                    </Link>

                    {!isSearchOpen && !isPremiumPage && (
                        <nav className="header_nav">
                            <NavLink to="/" end>Головна</NavLink>
                            <NavLink to="/catalog">Каталог</NavLink>
                            <NavLink to="/tv">TV шоу</NavLink>
                            <NavLink to="/new">Нове § Популярне</NavLink>
                            <NavLink to="/favorites">Обране</NavLink>
                        </nav>
                    )}

                    {isSearchOpen && !isPremiumPage && (
                        <div className="header_search_box">
                            <div className="header_search_bar">
                                <div className="header_search_left_icon" />
                                <input
                                    type="text"
                                    placeholder="Назва фільму, серіалу, ім’я актора, режисера"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                            </div>
                            {isSearchOpen && (
                                <div className={`header_search_results ${showPopular ? '' : 'no-before'}`}>
                                    {showPopular ? (
                                        <>
                                            <div className="header_search_films">
                                                {popularFilms.map(film => (
                                                    <div key={film.id} className="header_film_card">
                                                        <Link to={`/film/${film.id}`}>
                                                            <img src={film.image} className="header_films_preview" alt={film.title} />
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="header_search_actors">
                                                {popularActors.map(actor => (
                                                    <div key={actor.id} className="header_actor_card">
                                                        <Link to={`/actor/${actor.id}`}>
                                                            <img src={actor.image} className="header_actor_preview" alt={actor.name} />
                                                            <p className="header_actor_name">{actor.name}</p>
                                                            <p className="header_actor_role">{actor.role}</p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="search_results_display">
                                            <div className="search_results_columns">
                                                {searchResults.films.length > 0 && (
                                                    <div className="search_results_films_column">
                                                        <h3>Фільми та серіали</h3>
                                                        {searchResults.films.map(film => (
                                                            <Link to={`/film/${film.id}`} key={film.id} className="search_item_card">
                                                                <img src={film.image} className="search_item_image" alt={film.title} />
                                                                <div className="search_item_info">
                                                                    <p className="search_item_title">{film.title} <span className="search_item_type">(фільм)</span></p>
                                                                    <p className="search_item_rating">6.8 <span className="search_item_year">(2023)</span></p>
                                                                    <p className="search_item_genre">США • Пригоди</p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                                {searchResults.actors.length > 0 && (
                                                    <div className="search_results_actors_column">
                                                        <h3>Актори та режисери</h3>
                                                        {searchResults.actors.map(actor => (
                                                            <Link to={`/actor/${actor.id}`} key={actor.id} className="search_item_card actor">
                                                                <img src={actor.image} className="search_item_image_actor" alt={actor.name} />
                                                                <div className="search_item_info">
                                                                    <p className="search_item_title">{actor.name} <span className="search_item_type">(акторка)</span></p>
                                                                    <p className="search_item_birthdate">Barbara Ferreira, 1996</p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {searchResults.films.length === 0 && searchResults.actors.length === 0 && (
                                                <p className="no_results_text">Результатів не знайдено</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="header_right">
                    {!isPremiumPage && (
                        <div
                            className="header_search"
                            onClick={handleSearchToggle}
                            onMouseEnter={() => setIsSearchHovered(true)}
                            onMouseLeave={() => setIsSearchHovered(false)}
                        >
                            <div
                                className={`header_search_right_icon ${isSearchOpen ? 'open' : isSearchHovered ? 'hover' : ''}`}
                                onMouseEnter={() => setIsSearchHovered(true)}
                                onMouseLeave={() => setIsSearchHovered(false)}
                            />
                        </div>
                    )}

                    {!isPremiumPage && (
                        <Link to="/Premium" className="header_premium"> Оформити преміум </Link>
                    )}

                    <div className="header_promo">
                        <div className="header_promo_icon" />
                        <span className="header_promo_text">Ввести промокод</span>
                    </div>

                    {user ? (
                        <div className="header_profile">
                            <div onClick={toggleDropdown} className="header_profile_switch">
                                <div className={`header_arrow ${isDropdownOpen ? 'open' : ''}`} aria-label={isDropdownOpen ? 'Закрити меню' : 'Відкрити меню'} />
                                <div className="header_avatar" />
                            </div>

                            {isDropdownOpen && (
                                <div className="header_dropdown" ref={dropdownRef}>
                                    <div className="profile_info_block">
                                        <div className="profile_block">
                                            <div className="header_avatar" />
                                            <div className="profile_text_block">
                                                <div className="profile_name">
                                                    {user?.emailOrPhone ? user.emailOrPhone.split('@')[0] : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check_icon"></div>
                                    </div>
                                    <hr className="divider" />
                                    <ul>
                                        <li>
                                            <Link to="/profile" onClick={handleMenuItemClick} className="dropdown_link">
                                                <div className="dropdown_icon manage_icon"></div>
                                                Керувати профілем
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/settings" onClick={handleMenuItemClick} className="dropdown_link">
                                                <div className="dropdown_icon settings_icon"></div>
                                                Перейти до налаштувань
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown_link language_switch" onClick={handleMenuItemClick}>
                                                <div className="dropdown_icon language_icon"></div>
                                                English
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div onClick={onLoginClick} className="header_log_button">
                            <div className="log_button_icon"></div>
                            <span>Увійти</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
