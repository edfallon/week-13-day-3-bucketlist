const Request = require('./services/request.js');

// const quoteView = new QuoteView();
const requestToRemoteAPI = new Request('https://restcountries.eu/rest/v2/all');

const appStart = function(){
  requestToRemoteAPI.get(getAllCountries);
}

const getAllCountries = function(allCountries){
  populateDropdown(allCountries);
}
const populateDropdown = function(countries){

 const dropdown = document.querySelector('#countries-dropdown');
 countries.forEach(function(country){
   const option = document.createElement('option');
   option.value = countries.indexOf(country);
   option.textContent = country.name;
   dropdown.appendChild(option);
 });
}

window.addEventListener('load', appStart);
