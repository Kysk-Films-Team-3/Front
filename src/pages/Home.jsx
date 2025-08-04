import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

export const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const carouselTrackRef = useRef(null);
    const carouselWrapperRef = useRef(null);

    const slides = [
        { id: 1, className: "home_slide1" },
        { id: 2, className: "home_slide2" },
        { id: 3, className: "home_slide3" },
        { id: 4, className: "home_slide4" },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const carouselTrack = carouselTrackRef.current;
        const carouselWrapper = carouselWrapperRef.current;
        const slide = carouselTrack?.querySelector('.home_carousel_slide');

        if (carouselTrack && carouselWrapper && slide) {
            const wrapperWidth = carouselWrapper.offsetWidth;
            const slideWidth = slide.offsetWidth;
            const gap = 20;

            const centeringOffset = (wrapperWidth - slideWidth) / 2;
            const totalSlidesOffset = currentSlide * (slideWidth + gap);

            carouselTrack.style.transform = `translateX(${centeringOffset - totalSlidesOffset}px)`;
        }
    }, [currentSlide]);

    return (
        <div className="home">
            <div
                className="home_carousel_container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="home_carousel_outer_wrapper">
                    <div className="home_carousel_wrapper" ref={carouselWrapperRef}>
                        <div className="home_carousel_track" ref={carouselTrackRef}>
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="home_carousel_slide"
                                >
                                    <div className={`home_slide_background ${slide.className}`} />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevSlide}
                            className={`home_nav_button prev ${isHovered ? 'show' : ''}`}
                        />

                        <button
                            onClick={nextSlide}
                            className={`home_nav_button next ${isHovered ? 'show' : ''}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};