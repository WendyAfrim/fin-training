import {getRefreshToken, getToken} from "../security/services/tokenService";
import {refreshToken} from "../security/refreshToken";

export async function apiFetch(url, options = {})
{
    let fetchOptions = {};

    const headers = {
        'Content-type': 'application/json',
        ...options.headers
    }

    if (!options.bypassAuth) {
        const token = getToken();


        if(token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

    }

     fetchOptions = {
        ...options,
        headers: headers,
    }

    try  {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            if (response.status === 401) {
                const error = await response.text();
                let errorData = {};
                try {
                    errorData = JSON.parse(error);
                } catch (e) {
                    console.warn('Cannot parse error');
                }

                if (errorData.message.includes('Invalid credentials.')) {
                    throw new Error('Identifiant et/ou mot de passe erroné');
                } else if (errorData.message.includes('Expired JWT Token')) {
                    const refreshTokenSuccess = await refreshToken();

                    if (!refreshTokenSuccess) {
                        throw new Error('Refresh token failed');
                    }

                    const newToken = getToken();
                    const retryOptions = {
                        ...fetchOptions,
                        headers: {
                            ...headers,
                            'Authorization': `Bearer ${newToken}`,
                            'Content-type': 'application/json',
                        }
                    }

                    const retryCall = await fetch(url, retryOptions);

                    if (!retryCall.ok) {
                        throw new Error('Retry failed');
                    }

                    return await retryCall.json();
                }
            }
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}