import hitsTpl from "../templates/hits-card.hbs";
import NewsApiServise from "./apiService";


const refs = {
    searchform: document.querySelector('#search-form'),
    hitsContainer: document.querySelector('.gallery')
}

const newsApiServise = new NewsApiServise();

const element = document.getElementById('my-element-selector');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

refs.searchform.addEventListener('submit', onSearch);
element.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    newsApiServise.query = e.currentTarget.elements.query.value;
    newsApiServise.resetPage();
    newsApiServise.fetchHits()
        .then(createHitsMarkup);

}

function onLoadMore(e) {
    newsApiServise.fetchHits()
        .then(createHitsMarkup);
}

function createHitsMarkup(hits) {
    refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

