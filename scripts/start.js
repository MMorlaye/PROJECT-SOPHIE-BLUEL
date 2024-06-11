const reponse = await fetch('http://localhost:5678/api/works')
const users = await reponse.json();

function genererGallery(users) {
    for(const user of users) {
        const sectionGallerry = document.querySelector('.gallery')    
        const pieceElement = document.createElement("figure"); 

        const imageElement = document.createElement('img')
        imageElement.src = user.imageUrl;

        const titleElement = document.createElement('figcaption')
        titleElement.innerText = user.title;

        sectionGallerry.appendChild(pieceElement)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(titleElement)
    }
}

genererGallery(users);

const boutonAll = document.querySelector('.all-2')
boutonAll.addEventListener('click', ()=>{
    document.querySelector('.gallery').innerHTML = "";
    return genererGallery(users);
})

// ***********************génération de mes bouton de trie depuis l'API *********************** //
async function getCategoriesAndCreateButtons() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    const btnTryContainer = document.querySelector('.btn-try');

    categories.forEach(category => {
            const btn = document.createElement('button');
            btn.classList.add('all');
            btn.textContent = category.name;
            btn.addEventListener('click', () => {
                const filteredUsers = users.filter(user => user.categoryId === category.id);
                document.querySelector('.gallery').innerHTML = "";
                genererGallery(filteredUsers);
            });
            btnTryContainer.appendChild(btn);
    });
}


getCategoriesAndCreateButtons();




