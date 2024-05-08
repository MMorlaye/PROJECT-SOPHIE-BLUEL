const response = await fetch('http://localhost:5678/api/works');
const projects = await response.json();

// Définition de la fonction supprimerImage() pour supprimer une image côté client et côté serveur
async function supprimerImage(imageId) {
  try {
    // Appel à notre jeton d'authentification
    const token = localStorage.getItem('token');

    // Envoie d'une demande de suppression à l'API
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    
    // Vérifiez si la suppression a réussi côté serveur
    if (response.ok) {
      // Supprimez l'élément du DOM
      const imageElements = document.getElementsByClassName(imageId);
        // Removing the first element with the class name
        Array.from(imageElements).forEach(element => element.remove());
    } else {
      console.error('La suppression de l\'image a échoué.');
    }
  } catch (error) {
    console.error('Une erreur est survenue lors de la suppression de l\'image :', error);
  }
}

// Définition de la fonction genererGallery() pour créer la galerie d'images
function genererGallery(projects) {
  const sectionGallery = document.querySelector('#gallery');

  for (const project of projects) {
    const pieceElement = document.createElement("figure");

    const imageElement = document.createElement('img');
    imageElement.src = project.imageUrl;

    pieceElement.className = project.id;
    imageElement.className = project.id;

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteIcon.dataset.imageId = project.id; 

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(deleteIcon);
    sectionGallery.appendChild(pieceElement);
  }

  // Ajoutez un gestionnaire d'événements pour supprimer une image au clic sur l'icône de suppression
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', async (event) => {
      event.preventDefault(); // Empêcher le comportement par défaut du lien ou du bouton si nécessaire
      const imageId = icon.dataset.imageId;
      await supprimerImage(imageId);
    });
  });
}

genererGallery(projects);


// Sélection de l'élément de la modale principale
const modalContainer = document.querySelector('.modal-container');
let addImageButton = document.getElementById('add-image-btn');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const addImageModal = document.getElementById('add-image-modal');
const closeAddImageModalButton = document.querySelector('#add-image-modal .modal-trigger');
const arrowLeft = document.querySelector('.fa-arrow-left');
const modalPrince = document.querySelector('.modal');
const addImageForm = document.querySelector('.add-image-form');
const gallery = document.querySelector('#gallery');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const addImageButon = document.querySelector('#add-image-btn'); // Renommé pour éviter la duplication du nom de la variable

// Ajout d'un écouteur d'événement à chaque déclencheur de modale
modalTriggers.forEach(trigger => 
  trigger.addEventListener('click', toggleModal));

// Fonction pour basculer l'état de la modale
function toggleModal() {
  modalContainer.classList.toggle("active");
}

// Ajout d'un écouteur d'événement au bouton d'ajout d'image
addImageButton.addEventListener('click', () => {
  addImageModal.style.display = 'block';
});

// Ajout d'un écouteur d'événement à la flèche gauche pour masquer la modale d'ajout d'image et afficher la modale principale
arrowLeft.addEventListener('click', () => {
  addImageModal.style.display = 'none';
  modalPrince.style.display = 'block';
});

// Ajout d'un écouteur d'événement au bouton de fermeture de la modale d'ajout d'image
closeAddImageModalButton.addEventListener('click', () => {
  addImageModal.style.display = 'none';
});

// export function ajoutImage(){
//   const token = localStorage.getItem('token');
//   const addImageForm = document.querySelector('.add-image-form');
//   addImageForm.addEventListener("submit", function (event) {
//     event.preventDefault();

    
//     const addFile = event.target.querySelector('#image').files[0];
//     // const addFile = {
//     //   imageID: event.target.querySelector('[name=image]').value,
//     //   projectName: event.target.querySelector('[name=project-name]').value,
//     //   category: event.target.querySelector('[name=category]').value,
//     // }

//   const chargeUtile = JSON.stringify(addFile);
//   fetch('http://localhost:5678/api/works', {
//     method: "POST",
//     headers: {"Content-Type": "application/json" ,
//              'Authorization': `Bearer ${token}` 
//   }
    
// })
//   })
// }
  

// // Ajout d'un écouteur d'événement au changement du champ d'entrée d'image
// imageInput.addEventListener('change', function() {
//   const file = this.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.addEventListener('load', function() {
//       const imgElement = document.createElement('img');
//       imgElement.src = reader.result;
//       imgElement.alt = 'Image preview';

//       imagePreview.innerHTML = '';
//       imagePreview.appendChild(imgElement);
//     });

//     reader.readAsDataURL(file);
//   } 
// });

// // Ajout d'un écouteur d'événement au bouton "Ajouter une photo" pour déclencher le clic sur le champ d'entrée d'image
// addImageButton.addEventListener('click', function() {
//   imageInput.click();
// });




















// Ajout d'un écouteur d'événement à la soumission du formulaire d'ajout d'image
// addImageForm.addEventListener('submit', (e) => {
//   e.preventDefault();

  // // Récupération du fichier d'image, du titre et de la description depuis le formulaire
  // const imageFile = document.getElementById('image').files[0];
  // const title = document.getElementById('project-name').value;
  // const category = document.getElementById('category').value;

  // // Vérification si un fichier d'image est sélectionné
  // if (imageFile) {
  //   // Lecture du fichier d'image avec FileReader
  //   const reader = new FileReader();
  //   reader.onload = function(event) {
  //     // Création d'un élément image et définition de ses attributs
  //     const imgElement = document.createElement('img');
  //     imgElement.src = event.target.result;
  //     imgElement.alt = title;

  //     // Masquage de la modale d'ajout d'image et réinitialisation du formulaire
  //     addImageModal.style.display = 'none';
  //     addImageForm.reset();
  //   }
  //   reader.readAsDataURL(imageFile);
  // }
// });








// document.addEventListener('DOMContentLoaded', function() 
//   const addImageForm = document.getElementById('add-image-form');
//   const addImageModal = document.getElementById('add-image-modal');
//   const imageInput = document.getElementById('image');
//   const imagePreview = document.getElementById('image-preview');

const token = localStorage.getItem('token');
  addImageForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const imageFile = imageInput.files[0];
      const title = document.getElementById('project-name').value;  
      const category = document.getElementById('category').value;

      if (imageFile && title && category) {
          const formData = new FormData();
          formData.append('image', imageFile);
          formData.append('title', title);
          formData.append('category', category);

          fetch('http://localhost:5678/api/works', {
              method: 'POST',
              headers: {"Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`},
              body: formData
          })
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Erreur lors de l\'ajout de l\'image');
          })
          .then(data => {
              // Ajoutez ici le code pour afficher l'image ajoutée sur le DOM, si nécessaire
              console.log('Image ajoutée avec succès!', data);
              // Masquer la modale d'ajout d'image
              addImageModal.style.display = 'none';
              // Réinitialiser le formulaire
              addImageForm.reset();
          })
          .catch(error => {
              console.error(error);
              // Afficher un message d'erreur à l'utilisateur, si nécessaire
          });
      } else {
          console.error('Veuillez remplir tous les champs du formulaire');
          // Afficher un message à l'utilisateur indiquant qu'il doit remplir tous les champs
      }
  });

  imageInput.addEventListener('change', function() {
      const file = this.files[0];

      if (file) {
          const reader = new FileReader();

          reader.addEventListener('load', function() {
              const imgElement = document.createElement('img');
              imgElement.src = reader.result;
              imgElement.alt = 'Image preview';

              imagePreview.innerHTML = '';
              imagePreview.appendChild(imgElement);
          });

          reader.readAsDataURL(file);
      } else {
          imagePreview.innerHTML = `
              <img src="./assets/svg-image/picture-svgrepo-com 1.png" alt="Picture"> <br>
              <button id="add-file-image">+ Ajouter photo</button>
              <p>jpeg, png : 4mo max</p>
          `;
      }
  });

  // const addImageButon = document.getElementById('add-file-image');
  addImageButon.addEventListener('click', function() {
      imageInput.click();
  });


