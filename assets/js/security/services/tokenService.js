const TOKEN_KEY = 'jwt_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export function saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

export function saveRefreshToken(refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getToken(){
   return sessionStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}