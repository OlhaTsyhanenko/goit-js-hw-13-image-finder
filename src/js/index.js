
import { alert, info, success, error } from '../../node_modules/@pnotify/core/dist/PNotify';
import hitsTpl from "../templates/hits-card.hbs";
import NewsApiServise from "../js/apiService.js";


const refs = {
    searchform: document.querySelector('#search-form'),
    hitsContainer: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.btn'),
    label: document.querySelector('input')
}

refs.searchform.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);

const newsApiServise = new NewsApiServise();

refs.btnLoadMore.disabled = true;

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
            })
            .catch(error => {
                error({
                    text: "Ошибка! Введите запрос в поле ввода!"
                })
            })
            .finally(() => {
                
                refs.label.value = "";
                
            });
    }
      
}

function onLoadMore(e) {
    newsApiServise.fetchHits()
        .then(hits => {
            refs.btnLoadMore.disabled = false;
            appendHitsMarkup(hits);
            
            setTimeout(() => {
                e.target.scrollIntoView({
                    behavior: 'smooth',
                });
            }, 200);
        });
}

function appendHitsMarkup(hits) {
    refs.hitsContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHitsContainer() {
    refs.hitsContainer.innerHTML = '';
}


