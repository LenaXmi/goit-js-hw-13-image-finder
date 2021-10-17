const BASE_URL = 'https://pixabay.com/api/';

 function searchImagesByKeyword(keyword) {
 return fetch(
    `${BASE_URL}?key=23895189-b5b787f85de520230ba9fbe30&q=${keyword}&lang=en,ru&image_type=photo&orientation=horizontal&page=1&per_page=12`
  ).then(response => {
   return response.json()
  });
}

export default {searchImagesByKeyword}
