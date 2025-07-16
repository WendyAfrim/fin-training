const TOKEN_KEY = 'jwt_token';

export function saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

export function getToken(){
   return sessionStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}