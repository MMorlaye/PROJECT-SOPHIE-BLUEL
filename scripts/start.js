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

const boutonObject = document.querySelector('.object')
boutonObject.addEventListener('click', ()=>{
    const btnObject = users.filter(function(user){
        return user.categoryId === 1 && user.category.name === "Objets";
    })
    document.querySelector('.gallery').innerHTML = "";
    genererGallery(btnObject)
})


const boutonAppart = document.querySelector('.appart')
boutonAppart.addEventListener('click', ()=>{
    const btnAppart = users.filter(function(user){
        return user.categoryId === 2 && user.category.name === "Appartements";
    })
    document.querySelector('.gallery').innerHTML = "";
    genererGallery(btnAppart)
})

const boutonRelax = document.querySelector('.relaxation')
boutonRelax.addEventListener('click', ()=>{
    const btnRelax = users.filter(function(user){
        return user.categoryId === 3 && user.category.name === "Hotels & restaurants";
    })
    document.querySelector('.gallery').innerHTML = "";
    genererGallery(btnRelax)
})


