import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
});

const mockSlides = [
    { id: 1, className: "home_slide1", link: "/superman" },
    { id: 2, className: "home_slide2", link: "/fantastic-four" },
    { id: 3, className: "home_slide3", link: "/calmar-game" },
    { id: 4, className: "home_slide4", link: "/wensday" },
];

const mockCategories = [
    { name: 'Фільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347758/Film.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347755/Film_active.png' },
    { name: 'Серіали', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347719/Serial.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347716/Serial_active.png' },
    { name: 'Спорт', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347763/Sport.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347761/Sport_active.png' },
    { name: 'Мультфільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347730/Cartoon.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347727/Cartoon_active.png'},
    { name: 'Документальне', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347785/Documentary.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347780/Documentary_active.png' },
    { name: 'Інтерв\'ю', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347724/Interview.png', activeIcon:'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347721/Interview_active.png'},
    { name: 'Відеокурси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347792/Videocourses.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347788/Videocourses_active.png'},
    { name: 'Лекції', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347746/Lectures.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347744/Lectures_active.png' },
    { name: 'Фантастика', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347741/Fantasy.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347738/Fantasy_active.png' },
    { name: 'Ужаси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347777/Horror.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347766/Horror_active.png'},
    { name: 'Подкасти', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347735/Podcast.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347733/Podcast_active.png' },
    { name: 'Мюзикли', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347752/Musical.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347749/Musical_active.png' },
    { name: 'Природа', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347795/Nature.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756347713/Nature_active.png' },
];

const mockContent = [
    { id: 'Films', category: 'Фільми' },
    { id: 'Serial', category: 'Серіали' },
    { id: 'Sports', category: 'Спорт' },
    { id: 'Cartoon', category: 'Мультфільми' },
    { id: 'Documentary', category: 'Документальне' },
    { id: 'interview', category: 'Інтерв\'ю' },
    { id: 'VideoCourses', category: 'Відеокурси' },
    { id: 'Lectures', category: 'Лекції' },
    { id: 'Fantasy', category: 'Фантастика' },
    { id: 'Horrors', category: 'Ужаси' },
    { id: 'Podcasts', category: 'Подкасти' },
    { id: 'Musicals', category: 'Мюзикли' },
    { id: 'Nature', category: 'Природа' },
];

const mockFilms = [
    { id: 1, title: 'The Brothers Sun', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265240/Thebrotherssun.png' },
    { id: 2, title: 'Spider-Man', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265250/Spiderman.png' },
    { id: 3, title: 'Scooby-Doo', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265233/Scoobydoo.png' },
    { id: 4, title: 'Suits', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265246/Suit.png' },
    { id: 5, title: 'Monk', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265236/Monk.png' },
    { id: 6, title: 'Dragon 2', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265243/Dragon2.png' },
];

const mockActors = [
    { id: 123, name: 'Джейсон Стетхем', role: 'Актор', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265326/Statham.png' },
    { id: 124, name: 'Леонардо Ді Капріо', role: 'Актор', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265327/DiCaprio.png' },
    { id: 125, name: 'Марго Роббі', role: 'Актриса', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265327/Robbie.png' },
    { id: 126, name: 'Роберт Паттінсон', role: 'Актор', image: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1756265327/Pattinson.png' },
];


export const fakeSlides = async () => [...mockSlides];
export const fakeCategories = async () => [...mockCategories];
export const fakeContent = async (categoryNames) => {
    if (!categoryNames || categoryNames.length === 0) return [...mockContent];
    return mockContent.filter(item => categoryNames.includes(item.category));
};
export const getPopularFilms = async () => [...mockFilms];
export const getPopularActors = async () => [...mockActors];

const loadUsers = () => {
    try { return JSON.parse(localStorage.getItem('mockUsers') || '[]'); }
    catch (e) { console.error('Failed to parse mockUsers', e); return []; }
};

const saveUsers = (users) => {
    try { localStorage.setItem('mockUsers', JSON.stringify(users)); }
    catch (e) { console.error('Failed to save mockUsers', e); }
};

export const getAllUsers = () => loadUsers();

export const loginUserAPI = async (emailOrPhone, password) => {
    const key = emailOrPhone.trim().toLowerCase();
    await new Promise(r => setTimeout(r, 300));
    try {
        const users = loadUsers();
        const user = users.find(u => u.emailOrPhone === key);
        if (!user) return { success: false, message: 'Користувач не знайдений' };
        if (user.password !== password) return { success: false, message: 'Невірний пароль' };
        localStorage.setItem('user', JSON.stringify({ emailOrPhone: key }));
        return { success: true, user: { emailOrPhone: key }, token: 'fake_jwt_token_123' };
    } catch (e) { return { success: false, message: 'Внутрішня помилка сервера' }; }
};

export const logoutUser = async () => {
    await new Promise(r => setTimeout(r, 200));
    try { localStorage.removeItem('user'); return { success: true }; }
    catch (e) { return { success: false, message: 'Не вдалося вийти' }; }
};

export const saveRememberMe = (emailOrPhone, rememberMe) => {
    try {
        if (rememberMe) localStorage.setItem('rememberedUser', emailOrPhone);
        else localStorage.removeItem('rememberedUser');
    } catch (e) { console.error("Помилка в saveRememberMe:", e); }
};

export const getRememberedUser = () => {
    try { return localStorage.getItem('rememberedUser'); }
    catch (e) { console.error("Помилка в getRememberedUser:", e); return null; }
};

export const getAuthUser = () => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); }
    catch (e) { console.error("Помилка в getAuthUser:", e); return null; }
};

export const fakeRegisterEmail = async (emailOrPhone) => {
    const key = emailOrPhone.trim().toLowerCase();
    await new Promise(r => setTimeout(r, 300));
    try {
        const users = loadUsers();
        if (users.some(u => u.emailOrPhone === key)) return { success: false, message: 'Ця адреса вже зареєстрована' };
        users.push({ emailOrPhone: key, password: '' });
        saveUsers(users);
        return { success: true };
    } catch (e) { return { success: false, message: 'Помилка при збереженні даних' }; }
};

const mockVerificationCodes = {};

export const sendVerificationCodeAPI = async (emailOrPhone) => {
    const LENGTH = 5;
    const code = Array.from({ length: LENGTH }, () => Math.floor(Math.random() * 10)).join('');
    mockVerificationCodes[emailOrPhone] = code;
    await new Promise(r => setTimeout(r, 300));
    return { success: true, code };
};

export const verifyCodeAPI = async (emailOrPhone, code) => {
    await new Promise(r => setTimeout(r, 300));
    if (mockVerificationCodes[emailOrPhone] === code) return { success: true };
    return { success: false, message: 'Невірний код' };
};

export const setPasswordAPI = async (emailOrPhone, password) => {
    const key = emailOrPhone.trim().toLowerCase();
    await new Promise(r => setTimeout(r, 300));

    if (!mockVerificationCodes[key]) {
        return { success: false, message: 'Спочатку підтвердіть email/телефон' };
    }
    if (!password || password.length < 4) {
        return { success: false, message: 'Пароль повинен містити щонайменше 4 символи' };
    }

    const users = loadUsers();
    const idx = users.findIndex(u => u.emailOrPhone === key);
    if (idx >= 0) {
        users[idx].password = password;
    } else {
        users.push({ emailOrPhone: key, password });
    }
    saveUsers(users);

    const userData = { emailOrPhone: key };
    const token = "fake_jwt_token_" + Date.now();

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    delete mockVerificationCodes[key];

    return { success: true, user: userData, token };
};

export const setForgotPasswordAPI = setPasswordAPI;
