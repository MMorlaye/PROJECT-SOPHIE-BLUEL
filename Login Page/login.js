const errorMessageElement = document.getElementById('error-message')
document.querySelector('.formulaire-containt')
.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const chargeUtile = JSON.stringify(data);

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: chargeUtile
        });
        if (!response.ok) {
            errorMessageElement.textContent = 'Erreur : Identifiant ou mot de passe incorrect';
            errorMessageElement.style.display = 'block';
            throw new Error('Erreur lors de l\'authentification');
        }

        const responseData = await response.json();
        let token = responseData.token;

        localStorage.setItem('token', token);
        window.location.href = "/Mode Edition/edit.html";
        console.log('Authentification réussie. Jeton:', token);
        
    } catch (error) {
        console.error('Erreur:', error.message);
    }
});

