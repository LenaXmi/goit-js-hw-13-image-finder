const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=23895189-b5b787f85de520230ba9fbe30';

export default class ImageFinder {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?${API_KEY}&q=${this.searchQuery}&lang=en,ru&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;
    return fetch(url).then(response => {
      this.incrementPage();
      return response.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
