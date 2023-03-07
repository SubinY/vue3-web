/* api version */
// const version = 'v1';

/* http && https */
const HTTP = 'http://';
const HTTPS = 'https://';
export const DOMAIN = 'localhost:5173';

/* test base name */
export const TEST_BASENAME = HTTP + 'localhost:5173';

/* test api url */
export const TEST_API_SERVER = HTTP + 'localhost:51734';

/* production base name */
export const PRO_BASENAME = HTTPS + DOMAIN;

/* production api url */
export const PRO_API_SERVER = HTTPS + 'localhost:5174';

const getApiBaseName = (hostname) => {
    const host = hostname.split('-')[0];
    switch (host) {
        case 'localhost': return TEST_API_SERVER;
        case 'test': return TEST_API_SERVER;
        default: return PRO_API_SERVER;
    }
};

export const ApiBaseName = getApiBaseName(window.location.hostname);
