import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { fakeCategories, fakeContent, fakeSlides } from '../services/api';

export const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const carouselTrackRef = useRef(null);
    const carouselWrapperRef = useRef(null);
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredContent, setFilteredContent] = useState([]);
    const [allContent, setAllContent] = useState([]);
    const [slides, setSlides] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const loadedSlides = await fakeSlides();
                const loadedCategories = await fakeCategories();

                setSlides(loadedSlides);
                setCategories(loadedCategories);

                const allCategoryNames = loadedCategories.map(cat => cat.name);
                const loadedAllContent = await fakeContent(allCategoryNames);
                setAllContent(loadedAllContent);
                setFilteredContent(loadedAllContent);
            } catch (err) {
                console.error(err);
                setError("Ошибка при загрузке данных.");
            }
        };

        void loadInitialData();
    }, []);

    useEffect(() => {
        if (activeCategories.length === 0) {
            setFilteredContent(allContent);
        } else {
            const newFilteredContent = allContent.filter(item =>
                activeCategories.includes(item.category)
            );
            setFilteredContent(newFilteredContent);
        }
    }, [activeCategories, allContent]);

    const nextSlide = () => {
        if (slides.length > 0) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        if (slides.length > 0) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };

    const handleCategoryClick = (categoryName) => {
        let newActiveCategories;
        if (activeCategories.includes(categoryName)) {
            newActiveCategories = activeCategories.filter(name => name !== categoryName);
        } else {
            newActiveCategories = [...activeCategories, categoryName];
        }
        setActiveCategories(newActiveCategories);
    };

    useEffect(() => {
        let intervalId;
        if (!isHovered && slides.length > 0) {
            intervalId = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(intervalId);
    }, [isHovered, slides.length]);

    useEffect(() => {
        const updatePosition = () => {
            const track = carouselTrackRef.current;
            const wrapper = carouselWrapperRef.current;

            if (track && wrapper && slides.length > 0) {
                const slideWidth = 900;
                const gap = 20;
                const wrapperWidth = wrapper.offsetWidth;
                const centerOffset = (wrapperWidth - slideWidth) / 2;
                const slideOffset = currentSlide * (slideWidth + gap);
                track.style.transform = `translateX(${centerOffset - slideOffset}px)`;
            }
        };

        updatePosition();
        const timeoutId = setTimeout(updatePosition, 50);
        return () => clearTimeout(timeoutId);
    }, [currentSlide, slides.length]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home">
            <div className="home_static">
                <div
                    className="home_carousel_container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="home_carousel_outer_wrapper">
                        <div className="home_carousel_wrapper" ref={carouselWrapperRef}>
                            <div className="home_carousel_track" ref={carouselTrackRef}>
                                {slides.map((slide, index) => (
                                    <Link
                                        to={slide.link}
                                        key={slide.id}
                                        className={`home_carousel_slide ${index === currentSlide ? 'active' : ''}`}
                                    >
                                        <div className={`home_slide_background ${slide.className}`} />
                                    </Link>
                                ))}
                            </div>

                            {slides.length > 0 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className={`home_nav_button prev ${isHovered ? 'show' : ''}`}
                                    />
                                    <button
                                        onClick={nextSlide}
                                        className={`home_nav_button next ${isHovered ? 'show' : ''}`}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {categories.length > 0 && (
                <div className="home_categories">
                    {categories.map((category) => {
                        const isActive = activeCategories.includes(category.name);
                        return (
                            <button
                                key={category.name}
                                className={`home_categories_button ${isActive ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <img
                                    src={isActive ? category.activeIcon : category.icon}
                                    className="home_button_icon"
                                    alt={`Іконка ${category.name}`}
                                />
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="home_dynamic">
                {filteredContent.map(item => (
                    <div key={item.id} className="content_card">
                        <p>{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};