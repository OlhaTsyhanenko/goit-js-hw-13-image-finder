
import { alert, info, success, error } from '../../node_modules/@pnotify/core/dist/PNotify';
//import debounce from 'lodash.debounce';
import hitsTpl from "../templates/hits-card.hbs";
import NewsApiServise from "../js/apiService.js";


const refs = {
    searchform: document.querySelector('#search-form'),
    hitsContainer: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('#btn')
}

const element = document.getElementById('my-element-selector');


function onBtnLoadMoreClick() {
    element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

refs.searchform.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

const newsApiServise = new NewsApiServise();

 refs.btnLoadMore.disabled = true;
console.log(refs.btnLoadMore.disabled);

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
            refs.btnLoadMore.disabled = false;

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
        .then(hits => {
            refs.btnLoadMore.disabled = false;
            appendHitsMarkup(hits);
         });
}

function appendHitsMarkup(hits) {
    refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHitsContainer() {
    refs.hitsContainer.innerHTML = '';
}


