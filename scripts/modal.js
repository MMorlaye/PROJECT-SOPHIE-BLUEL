// *************** Variable_declaration *************** //

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
const addImageButon = document.querySelector('#add-image-btn');
const addSubmitBtn = document.getElementById('submitBtn');
const projectName = document.getElementById('project-name');
const categoryInput = document.getElementById('category');


// *************** Opening_The_Modal *************** //

modalTriggers.forEach(trigger =>
  trigger.addEventListener('click', toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

addImageButton.addEventListener('click', () => {
  addImageModal.style.display = 'block';
});

arrowLeft.addEventListener('click', () => {
  addImageModal.style.display = 'none';
  modalPrince.style.display = 'block';
});

closeAddImageModalButton.addEventListener('click', () => {
  addImageModal.style.display = 'none';
});

// ************* Function_Create_and_Generate_Gallery_of_The_Home_Page *******************//

const response = await fetch('http://localhost:5678/api/works');
const projects = await response.json();

function createGalleryHomePage(id, imageUrl, title) {
  const sectionGallery = document.querySelector('.gallery');   
  const imageContainer = document.createElement("figure");

  const projectImage = document.createElement('img');
  projectImage.src = imageUrl;

  projectImage.className = id;
  imageContainer.className = id;

  const titleElement = document.createElement('figcaption');
  titleElement.innerText = title;

  sectionGallery.appendChild(imageContainer);
  imageContainer.appendChild(projectImage);
  imageContainer.appendChild(titleElement);
}

function generateGalleryHomePage(projects) {
  for (const project of projects) {
    createGalleryHomePage(project.id, project.imageUrl, project.title);
  }
}
generateGalleryHomePage(projects);

// *********************** Function_Create_and_Generate_Gallery_of_The_Modal *************************/

function createGalleryModal(id, imageUrl) {
  const sectionGallery = document.querySelector('#gallery');
  const imageContainer = document.createElement("figure");

  const projectImage = document.createElement('img');
  projectImage.src = imageUrl;

  imageContainer.className = id;
  projectImage.className = id;

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteIcon.dataset.projetID = id;

  imageContainer.appendChild(projectImage);
  imageContainer.appendChild(deleteIcon);
  sectionGallery.appendChild(imageContainer);

  deleteIcon.addEventListener('click', async (event) => {
    event.preventDefault();
    const projetID = deleteIcon.dataset.projetID;
    await removeImageHomePageAndModal(projetID);
});
}

function generateGalleryModal(projects) {
  for (const project of projects) {
    createGalleryModal(project.id, project.imageUrl);
  }
}

generateGalleryModal(projects);


// *********************** Function_Remove_Image_Home_Page_and_Modal ************************* //

async function removeImageHomePageAndModal(projetID) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5678/api/works/${projetID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (response.ok) {
    const imageElements = document.getElementsByClassName(projetID);
    Array.from(imageElements).forEach(element => element.remove());
  } else {
    console.error('La suppression de l\'image a échoué.');
  }
}

// ************** Function_for_sending_a_new_project *************** //

addImageForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const imageFile = imageInput.files[0];
  const title = document.getElementById('project-name').value;
  const category = document.getElementById('category').value;

  if (imageFile && title && category) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${token}`},
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        createGalleryHomePage(data.id, data.imageUrl, data.title);
        createGalleryModal(data.id, data.imageUrl);

        addImageForm.reset();
        imagePreview.innerHTML = `
          <img src="./assets/svg-image/picture-svgrepo-com 1.png" alt="Picture"> <br>
          <button id="add-file-image">+ Ajouter photo</button>
          <p>jpeg, png : 4mo max</p>
        `;

        addImageModal.style.display = 'none';
        modalContainer.classList.remove("active");
      } else {
        console.error('Erreur lors de l\'ajout de l\'image :', response.statusText);
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'ajout de l\'image :', error);
    }
  } else {
    console.error('Veuillez remplir tous les champs du formulaire');
  }
});

// ************** Add_an_Image_and_Preview_it_in_The_Modal *************** //

imageInput.addEventListener('change', function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
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

addImageButon.addEventListener('click', function () {
  imageInput.click();
});

// ************** Generate_drop-down_lists_dynamically *************** //

async function getCategoriesAndUpdateDropdown() {
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  categories.forEach(category => {
    const categoryDropdown = document.getElementById('category');
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categoryDropdown.appendChild(option);
  });
}

// ********** Disabling and enabling the validate button before and after click ********** //

const categoryElement = document.getElementById('category');
categoryElement.addEventListener('click', getCategoriesAndUpdateDropdown);
function submitBtn() {
  if (imageInput.value && projectName.value && categoryInput.value) {
    addSubmitBtn.style.backgroundColor = '#1D6154';
    addSubmitBtn.disabled = false;
  } else {
    addSubmitBtn.style.backgroundColor = 'grey';
    addSubmitBtn.disabled = true;
  }
}

imageInput.addEventListener('change', submitBtn);
projectName.addEventListener('input', submitBtn);
categoryInput.addEventListener('change', submitBtn);


// ************** Logout_management_on_the_page *************** //

const logoutLink = document.getElementById('logout-link')

logoutLink.addEventListener('click', ()=>{
  event.preventDefault();
  localStorage.removeItem('token')
  window.location.href = '../index.html'
  console.log('Déconnexion Réussie')
})