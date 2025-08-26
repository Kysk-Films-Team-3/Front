export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(phone);
};

export const isValidEmailOrPhone = (value) => {
    return isValidEmail(value) || isValidPhone(value);
};

export const isValidPassword = (password) => {
    return typeof password === 'string' && password.length >= 4 && password.length <= 60;
};

export const isValidVerificationCode = (code, length = 5) => {
    if (Array.isArray(code)) {
        const fullCode = code.join('');
        return code.every(digit => digit !== '' && /^\d$/.test(digit)) &&
            fullCode.length === length;
    } else if (typeof code === 'string') {
        const digitRegex = new RegExp(`^\\d{${length}}$`);
        return digitRegex.test(code);
    }
    return false;
};

export const hasEmptyVerificationFields = (code) => {
    if (!Array.isArray(code)) return true;
    return code.some(digit => digit === '');
};

export const isValidDigit = (value) => {
    return /^\d?$/.test(value);
};

export const getVerificationCodeError = (code, length = 5) => {
    if (!Array.isArray(code)) {
        return 'Невірний формат коду';
    }

    if (hasEmptyVerificationFields(code)) {
        return `Код має містити ${length} цифр`;
    }

    const fullCode = code.join('');
    if (!/^\d+$/.test(fullCode)) {
        return 'Код має містити тільки цифри';
    }

    if (fullCode.length !== length) {
        return `Код має містити ${length} цифр`;
    }

    return null;
};

