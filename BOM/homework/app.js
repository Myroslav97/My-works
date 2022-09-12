const root = document.getElementById('root');
let imageId = '';
let countDisplayedImages = 1;

const containerImage = document.getElementById('characters-wrap');
const input = document.getElementById("search-input");
const search = document.getElementById("search-btn");
const loadMoreButton = document.querySelector('.load-more');

if (!localStorage.getItem('maxImgCount')) {
    localStorage.setItem('maxImgCount', 5)
}

const getImages = (data, fromLocalStorage) => {
    const maxImgCount = localStorage.getItem('maxImgCount')

    const content = document.createElement('div');
    content.classList.add('content');
    content.setAttribute('id', data.id);
    if (!fromLocalStorage && maxImgCount < JSON.parse(localStorage.getItem('images')).length || 
    fromLocalStorage && countDisplayedImages > maxImgCount) {
        content.classList.add('hidden-img');
    }

    const img = document.createElement('img');
    img.setAttribute('src', data.image);

    const name = document.createElement('p');
    name.innerHTML = data.name;

    const gender = document.createElement('p');
    gender.innerHTML = data.gender;

    const clearImg = document.createElement('button');
    clearImg.classList.add('clear-btn');
    clearImg.setAttribute('id', data.id);
    clearImg.innerHTML = 'Delete';

    content.append(img);
    content.append(name);
    content.append(gender);
    content.append(clearImg);

    containerImage.prepend(content);

    clearImg.addEventListener('click', (e) => {
        const images = JSON.parse(localStorage.getItem('images'));
        localStorage.setItem('images', JSON.stringify(images.filter(img => +img.id !== +e.target.id)));
        document.getElementById(e.target.id).remove();
    })
    countDisplayedImages++;
};

async function sendRequest() {

    const requestUrl = `https://rickandmortyapi.com/api/character/${imageId}`;
    const response = await fetch(requestUrl);

    if (response.ok) {
        const data = await response.json();
        const {
            id,
            name,
            gender,
            image
        } = data;
        if (localStorage.getItem('images') && JSON.parse(localStorage.getItem('images')).find(img => +img.id === +id)) {
            alert('Image alredy exist');
        } else {
            const formmatedData = {
                id,
                name,
                gender,
                image
            }
            const existingImages = localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : [];
            existingImages.push(formmatedData);
            localStorage.setItem('images', JSON.stringify(existingImages));
            getImages(formmatedData, false);
        }
    } else {
        alert('Charraster not found');
    }
}

search.addEventListener('click', () => {
    imageId = input.value;
    if (+imageId) {
        sendRequest();
        input.value = '';
    } else {
        alert('Please input a number');
    }
});

loadMoreButton.addEventListener('click', () => {
    const hiddenImgs = Array.from(document.getElementsByClassName('hidden-img'));
    hiddenImgs.forEach(img => img.classList.remove('hidden-img'));
    localStorage.setItem('maxImgCount', +localStorage.getItem('maxImgCount') + 5);
});

const images = JSON.parse(localStorage.getItem('images'));

if (images && images.length) {
    images.forEach(img => getImages(img, true));
}