import {apiFetch} from "../api/apiClient";

async function getUserProfile()
{
    document.addEventListener('DOMContentLoaded', async (event) => {
        const profileDiv = document.getElementById('profile-info');
        if (profileDiv) {
            try {
                const data = await apiFetch('/api/profile');

                profileDiv.textContent = data.email;
            } catch (error) {
                profileDiv.textContent = error.message
            }
        }
    })
}

getUserProfile();