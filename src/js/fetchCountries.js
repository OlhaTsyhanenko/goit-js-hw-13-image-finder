//import './sass/main.scss';
import { alert, info, success, error } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs';
import countriesCardTpl from '../templates/list-countries-card.hbs';
import API from '../js/api-service.js';


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchInput: document.querySelector('.js-search-input')
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    clearContainer();

    const searchQuery = refs.searchInput.value;

    API.fetchCountries(searchQuery)
        .then(data => {
            if (data.length === 1) {
                renderCountryCard(data, countryCardTpl);
            } else if (data.length <= 10) {
                renderCountryCard(data, countriesCardTpl);
            } else if (data.length > 10) {
                error({
                    text: "Too many matches found. Please enter a more specific query!"
                });
            } else if (data.status === 404) {
                error({
                    text: "No country has been found. Please enter a more specific query!"
                });
            }
        })
        .catch(onFetchError);
        // .finally(() => {
        // e.target.value = "";
        // });
    
}

function clearContainer() {
    refs.cardContainer.innerHTML = '';
}

function renderCountryCard(country, template) {
    const markup = country.map(count => template(count)).join('');
    refs.cardContainer.innerHTML = markup;
}



function onFetchError(error) {
    Error({
          text: "Error!"
      });
}



