
import { alert, info, success, error } from '../../node_modules/@pnotify/core/dist/PNotify';
//import debounce from 'lodash.debounce';
import hitsTpl from "../templates/hits-card.hbs";
import NewsApiServise from "../js/apiService.js";


const refs = {
    searchform: document.querySelector('#search-form'),
    hitsContainer: document.querySelector('.gallery')
}

const element = document.getElementById('my-element-selector');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

refs.searchform.addEventListener('submit', onSearch);
element.addEventListener('click', onLoadMore);

const newsApiServise = new NewsApiServise();

function onSearch(e) {
    e.preventDefault();
    
    newsApiServise.query = e.currentTarget.elements.query.value;
    
    if (newsApiServise.query.trim() === '') {
        info({
            text: "Введите запрос в поле ввода!"
        })
    } else {
        newsApiServise.resetPage();
    newsApiServise.fetchHits()
        .then(hits => {

            if (hits.length === 0) {
                info({
                    text: "По вашему запросу ничего не найдено!"
                })
            }

            clearHitsContainer();
            appendHitsMarkup(hits);
        });   
    }
      
}

function onLoadMore(e) {
    newsApiServise.fetchHits()
        .then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
    refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHitsContainer() {
    refs.hitsContainer.innerHTML = '';
}


