import {getToken} from "../security/services/tokenService";

export async function apiFetch(url, options = {})
{
    const token = getToken();

    const headers = {
        'Content-type': 'application/json',
        ...options.headers
    }

    if(token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = {
        ...options,
        headers: headers,
    }
    try  {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {

            if (response.status === 401) {
                throw new Error('Authentification expirée. Veuillez vous reconnecter');
            }

            const errorText = await response.text();
            if (errorText) {
                throw new Error(`Erreur Api : ${response.status} ${errorText}`);
            }
        }


        return await response.json();
    } catch (error) {
        console.error(error);
    }

}