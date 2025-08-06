import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

//Fake api

///home.jsx

const mockSlides = [
    { id: 1, className: "home_slide1", link: "/superman" },
    { id: 2, className: "home_slide2", link: "/fantastic-four" },
    { id: 3, className: "home_slide3", link: "/calmar-game" },
    { id: 4, className: "home_slide4", link: "/wensday" },
];

const mockCategories = [
    { name: 'Фільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412564/Films.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432280/Filmactive.png' },
    { name: 'Серіали', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412644/Serial.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432264/Serialactive.png' },
    { name: 'Спорт', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412566/Sport.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432282/Sportactive.png' },
    { name: 'Мультфільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412565/Cartoons.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432268/Cartoonsactive.png' },
    { name: 'Документальне', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412563/Documentary.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432258/Documentaryactive.png' },
    { name: 'Інтерв\'ю', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412564/Interview.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432266/Interviewactive.png' },
    { name: 'Відеокурси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412564/Videocourses.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432259/Videocoursesactive.png' },
    { name: 'Лекції', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412566/Lectures.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432275/Lecturesactive.png' },
    { name: 'Фантастика', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412565/Fantasy.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432273/Fantasyactive.png' },
    { name: 'Ужаси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412567/Horrors.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432284/Horrorsactive.png' },
    { name: 'Подкасти', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412691/Podcasts.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432271/Podcastsactive.png' },
    { name: 'Мюзикли', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412704/Musicals.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432278/Musicalsactive.png' },
    { name: 'Природа', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754412716/Nature.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1754432262/Natureactive.png' },
];

const mockContent = [

        { id: 'films', category: 'Фільми' },
        { id: 'series', category: 'Серіали' },
        { id: 'sports', category: 'Спорт' },
        { id: 'cartoon', category: 'Мультфільми' },
        { id: 'doc', category: 'Документальне' },
        { id: 'interview', category: 'Інтерв\'ю' },
        { id: 'videocourses', category: 'Відеокурси' },
        { id: 'lectures', category: 'Лекції' },
        { id: 'fantasy', category: 'Фантастика' },
        { id: 'horrors', category: 'Ужаси' },
        { id: 'podcasts', category: 'Подкасти' },
        { id: 'musicals', category: 'Мюзикли' },
        { id: 'nature', category: 'Природа' },

];
export const fakeSlides = async () => {
    return [...mockSlides];
};
export const fakeCategories = async () => {
    return [...mockCategories];
};

export const fakeContent = async (categoryNames) => {

    if (!categoryNames || categoryNames.length === 0) {
        return [...mockContent];
    } else {
        return mockContent.filter(item => categoryNames.includes(item.category));
    }
};


