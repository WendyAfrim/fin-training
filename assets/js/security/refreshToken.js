import {getRefreshToken, saveRefreshToken, saveToken} from "./services/tokenService";

export async function refreshToken(){
    try {
        const refreshToken = getRefreshToken()

        const response = await fetch('/api/refresh/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh_token': refreshToken})
        })

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message);
        }

        saveToken(json.token);
        saveRefreshToken(json.refresh_token)

        return json;
    } catch (error) {
        console.log(`Error in refresh token.js : ${error}`);
    }
}