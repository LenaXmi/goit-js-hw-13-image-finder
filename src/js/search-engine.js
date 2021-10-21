import css from '../css/main.css'
import ImageFinder from './api-service.js'
import getRefs from './refs.js'
import card from '../templates/gallery-card-template.hbs'
import debounce from 'lodash.debounce'
import MyNotification from './notification.js'


const refs = getRefs()
const galleryItem = refs.list.children
const imageFinder = new ImageFinder()
const notification = new MyNotification()

refs.form.addEventListener('input', debounce(onSearch, 1000))
refs.button.addEventListener('click', onLoadMore)

function onSearch(e) {
console.log(galleryItem.length)
    clearImageCard()
    imageFinder.query = e.target.value
    imageFinder.resetPage()

    if (imageFinder.query !== '') {
        imageFinder.fetchImages().then(markup).catch(error=>{notification.myError()})
        refs.button.style.display = 'block'
    
    }


    else {
       
         refs.list.innerHTML = ''
        refs.button.style.display = 'none'
        notification.myInfo()
    }

 
   
}



function markup(keyword) {
    const cardImg = card(keyword)
    refs.list.insertAdjacentHTML('beforeend', cardImg)
    
}

function onLoadMore(e) {
  
    imageFinder.fetchImages().then(markup)
scrollGallery()

    
}

function scrollGallery() {
        setTimeout(() => {
      refs.button.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
  }, 300)
}

function clearImageCard() {
    refs.list.innerHTML = ''
}





