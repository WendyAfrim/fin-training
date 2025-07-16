import { saveToken } from "./services/tokenService";
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
                // const response = await fetch('/api/login', {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify(data)
                // })
                const response = apiFetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
    
                if (!response.ok) {
                    throw new Error('Identifiant et/ou mot de passe erronés');
                }

                const result = await response.json();
                saveToken(result.token);

                window.location.href = '/profile';
            } catch (e) {
                const errorDiv = document.getElementById('login-error');
                errorDiv.textContent = e.message;
            }
        })
    }
}

handleLoginForm();