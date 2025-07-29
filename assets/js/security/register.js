import {apiFetch} from "../api/apiClient";

function handleRegisterForm() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async(event) => {
            event.preventDefault();

            const formData = new FormData(registerForm);

            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
            }

            try {
                const response = await apiFetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    bypassAuth: true,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                })

                if (!response.ok) {
                    if (response.status === 422){
                        const violations = response.violations;
                        displayViolations(violations);
                        return;
                    }
                }

                const registerSuccessDiv = document.getElementById('register-success');
                if (registerSuccessDiv) {
                    console.log('test');
                    registerSuccessDiv.textContent = 'Inscription réussie';
                }
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);

                return response;

            } catch (error) {
                const errorDiv = document.getElementById('register-error');
                console.log(errorDiv);
                if (errorDiv) {
                    errorDiv.textContent = error.message;
                } else {
                    console.error(error.message)
                }
            }
        });
    }
}

function displayViolations(violations) {
    document.querySelectorAll('.error-message').forEach(error => error.textContent = "");

    violations.forEach(violation => {
        const field = violation.propertyPath;

        const errorContainer = document.getElementById(`error-${field}`);
        if (errorContainer) {
            errorContainer.textContent = violation.title;
        }
    });

}

handleRegisterForm();