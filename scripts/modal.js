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

// ***********************/*************************/

const response = await fetch('http://localhost:5678/api/works');
const projects = await response.json();

function createGalleryElement(id, imageUrl) {
  const sectionGallery = document.querySelector('#gallery');
  const pieceElement = document.createElement("figure");

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  pieceElement.className = id;
  imageElement.className = id;

  const deleteIcon = document.createElement('span');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteIcon.dataset.projetID = id;

  pieceElement.appendChild(imageElement);
  pieceElement.appendChild(deleteIcon);
  sectionGallery.appendChild(pieceElement);
}

function createGalleryElementHome(id, imageUrl, title) {
  const sectionGallery = document.querySelector('.gallery');
  const pieceElement = document.createElement("figure");

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  imageElement.className = id;
  pieceElement.className = id;

  const titleElement = document.createElement('figcaption');
  titleElement.innerText = title;

  sectionGallery.appendChild(pieceElement);
  pieceElement.appendChild(imageElement);
  pieceElement.appendChild(titleElement);
}

function genererGallery(projects) {
  for (const project of projects) {
    createGalleryElement(project.id, project.imageUrl);
  }
  const deleteIcons = document.querySelectorAll('.delete-icon');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', async (event) => {
      event.preventDefault();
      const projetID = icon.dataset.projetID;
      await removeImageHomePageAndModal(projetID);
    });
  });
}

function genererGalleryHome(projects) {
  for (const project of projects) {
    createGalleryElementHome(project.id, project.imageUrl, project.title);
  }
}

genererGallery(projects);
genererGalleryHome(projects);

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
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        const newImageElement = document.createElement('img');
        newImageElement.src = data.imageUrl;
        gallery.appendChild(newImageElement);

        addImageForm.reset();
        createGalleryElement(data.id, data.imageUrl);
        createGalleryElementHome(data.id, data.imageUrl, data.title);
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

const categoryElement = document.getElementById('category');
categoryElement.addEventListener('click', getCategoriesAndUpdateDropdown);

const addSubmitBtn = document.getElementById('submitBtn');
const projectName = document.getElementById('project-name');
const categoryInput = document.getElementById('category');

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
