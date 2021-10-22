import css from '../css/main.css';
import ImageFinder from './api-service.js';
import getRefs from './refs.js';
import card from '../templates/gallery-card-template.hbs';
import debounce from 'lodash.debounce';
import MyNotification from './notification.js';

const refs = getRefs();
const galleryItems = refs.list.children;
const imageFinder = new ImageFinder();
const notification = new MyNotification();

refs.form.addEventListener('input', debounce(onSearch, 1000));
refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    imageFinder.query = e.target.value;
     clearImageCard()
  
   

    if (imageFinder.query !== '') {
        imageFinder.resetPage();
    renderGallery();
    }
    else {
    refs.button.style.display = 'none';
    clearImageCard();
    notification.myInfo();
  }
}

function renderGallery() {
  imageFinder
    .fetchImages()
    .then(hits => {
      markup(hits);
      refs.button.style.display = 'block';
        if (galleryItems.length === 0) {
     
        refs.button.style.display = 'none';
        notification.myNotice();
      }
    })
    .catch(error => {
      notification.myError();
    });
}

function markup(keyword) {
  const cardImg = card(keyword);
  refs.list.insertAdjacentHTML('beforeend', cardImg);
}

function onLoadMore(e) {
  imageFinder.fetchImages().then(markup).then(scrollGallery);
}

function scrollGallery() {
  setTimeout(() => {
    refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
}

function clearImageCard() {
  refs.list.innerHTML = '';
}
