export default class NewsApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchHits() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23047569-c77e6b9c2c44e7090fa2652c3`)
            .then(response => response.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}