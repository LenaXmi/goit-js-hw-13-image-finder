import css from '../css/main.css'
import API from './api-service.js'
import getRefs from './refs.js'
import card from '../templates/gallery-card-template.hbs'
import debounce from 'lodash.debounce'
const refs = getRefs()



refs.form.addEventListener('input', debounce(onSearch, 1000))

function onSearch(e) {
    const searchQuery = e.target.value
    API.searchImagesByKeyword(searchQuery).then(markup)
}



function markup(keyword) {
    const cardImg = card(keyword)
    refs.list.innerHTML = cardImg
    console.log(cardImg)
}

