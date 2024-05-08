document.querySelector('.formulaire-containt').addEventListener('submit', async function(event) {
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
            throw new Error('Erreur lors de l\'authentification');
        }

        const responseData = await response.json();
        let token = responseData.token;

        // Stocker le jeton dans le stockage local 
        localStorage.setItem('token', token);

        // Rediriger vers la page d'accueil après l'authentification réussie
        window.location.href = "/Mode Edition/edit.html";

        console.log('Authentification réussie. Jeton:', token);
    } catch (error) {
        console.error('Erreur:', error.message);
    }
});