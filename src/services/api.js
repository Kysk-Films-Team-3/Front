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
    { name: 'Фільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876971/Film.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876970/Film_active.png' },
    { name: 'Серіали', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877032/Serial.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877031/Serial_active.png' },
    { name: 'Спорт', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877033/Sport.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877056/Sport_active.png' },
    { name: 'Мультфільми', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876973/Cartoons.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876972/Cartoons_active.png' },
    { name: 'Документальне', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877028/Documentary.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877027/Documentary_active.png' },
    { name: 'Інтерв\'ю', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877047/Interview_hover.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877046/Interview_active.png' },
    { name: 'Відеокурси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877055/Videocourses.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877029/Videocourses_active.png' },
    { name: 'Лекції', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876967/Lectures.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876966/Lectures_active.png' },
    { name: 'Фантастика', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876965/Fantasy.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755884530/Fantasy_active.png' },
    { name: 'Ужаси', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877036/Horrors.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877034/Horrors_active.png' },
    { name: 'Подкасти', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876964/Podcasts.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876974/Podcasts_active.png' },
    { name: 'Мюзикли', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876969/Musicals.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755876968/Musicals_active.png' },
    { name: 'Природа', icon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877044/Nature.png', activeIcon: 'https://res.cloudinary.com/da9jqs8yq/image/upload/v1755877043/Nature_active.png' },
];

const mockContent = [
    { id: 'films', category: 'Фільми' },
    { id: 'series', category: 'Серіали' },
    { id: 'sports', category: 'Спорт' },
    { id: 'cartoon', category: 'Мультфільми' },
    { id: 'Documentary', category: 'Документальне' },
    { id: 'interview', category: 'Інтерв\'ю' },
    { id: 'videocourses', category: 'Відеокурси' },
    { id: 'lectures', category: 'Лекції' },
    { id: 'fantasy', category: 'Фантастика' },
    { id: 'horrors', category: 'Ужаси' },
    { id: 'podcasts', category: 'Подкасти' },
    { id: 'musicals', category: 'Мюзикли' },
    { id: 'nature', category: 'Природа' },
];

export const fakeSlides = async () => [...mockSlides];
export const fakeCategories = async () => [...mockCategories];
export const fakeContent = async (categoryNames) => {
    if (!categoryNames || categoryNames.length === 0) return [...mockContent];
    return mockContent.filter(item => categoryNames.includes(item.category));
};

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
