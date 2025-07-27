import {saveRefreshToken, saveToken} from "./services/tokenService";
import {apiFetch} from "../api/apiClient";

function handleLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const data = {
                username: formData.get('email'),
                password: formData.get('password')
            }

            try {
                const response = await apiFetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    bypassAuth: true
                })

                saveToken(response.token);
                saveRefreshToken(response.refresh_token);

                window.location.href = '/profile';
            } catch (e) {
                const errorDiv = document.getElementById('login-error');
                if (errorDiv) {
                    errorDiv.textContent = e.message;
                } else {
                    console.error(e.message)
                }
            }
        })
    }
}

handleLoginForm();