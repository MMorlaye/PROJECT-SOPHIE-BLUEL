const reponse = await fetch('http://localhost:5678/api/works')
const projects = await reponse.json();

function genererGallery(projects) {
    for(const project of projects) {
        const sectionGallerry = document.querySelector('.gallery')    
        const pieceElement = document.createElement("figure"); 

        const imageElement = document.createElement('img')
        imageElement.src = project.imageUrl;

        const titleElement = document.createElement('figcaption')
        titleElement.innerText = project.title;

        sectionGallerry.appendChild(pieceElement)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(titleElement)
    }
}

genererGallery(projects);

const boutonAll = document.querySelector('.all-2')
boutonAll.addEventListener('click', ()=>{
    document.querySelector('.gallery').innerHTML = "";
    return genererGallery(projects);
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
                const filteredProjects = projects.filter(project => project.categoryId === category.id);
                document.querySelector('.gallery').innerHTML = "";
                genererGallery(filteredProjects);
            });
            btnTryContainer.appendChild(btn);
    });
}

getCategoriesAndCreateButtons();