
export function setSessionStorageData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getSessionStorageData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function clearSessionStorageData() {
    sessionStorage.removeItem('userData');
}

export function validateInput(key, param) {
    const params = {
        make: () => param.length >= 4 ? false : true,
        model: () => param.length >= 4 ? false : true,
        year: () => Number(param) <= 1950 || Number(param) >= 2050,
        description: () => param.length > 10 ? false : true,
        price: () => Number(param) > 0 ? false : true,
        img: () => param !== '' ? false : true,
    };

    return params[key]();
}