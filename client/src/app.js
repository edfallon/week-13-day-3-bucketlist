const Request = require('./services/request.js');
const CountryView = require('./views/countryView');

const countryView = new CountryView();
const requestToRemoteAPI = new Request('https://restcountries.eu/rest/v2/all');
const requestToMongodb = new Request('http://localhost:3000/api/countries')

const appStart = function(){
  requestToRemoteAPI.get(getAllCountries);
  requestToMongodb.get(populateBucketlist);

  const createDeleteButton = document.querySelector("#deleteButton");
  createDeleteButton.addEventListener("click", handleDeleteButttonClick);
}

const getAllCountries = function(allCountries){
  populateDropdown(allCountries);
  const dropdownList = document.querySelector("#countries-dropdown");
  dropdownList.addEventListener("change", function(){
    const selectedDropdownCountry = allCountries[this.value];
    handleAddToBucketList(selectedDropdownCountry);
  })
}

const handleAddToBucketList = function(country){
  requestToMongodb.post(country, requestToSaveCountry)
}

const requestToSaveCountry = function(savedCountry){
  countryView.addCountry(savedCountry);
}

const populateBucketlist = function(allCountriesFromMongo){
  const ul = document.querySelector("#selected-countries");
  allCountriesFromMongo.forEach(function(country){
    const nameLi = document.createElement('li');
    nameLi.textContent = country.name;
    ul.appendChild(nameLi);
  })

}

const populateDropdown = function(countries){
 const dropdown = document.querySelector('#countries-dropdown');
 countries.forEach(function(country){
   const option = document.createElement('option');
   option.innerHtml = "";
   option.value = countries.indexOf(country);
   option.textContent = country.name;
   dropdown.appendChild(option);
 });
}

const handleDeleteButttonClick = function(event){
  event.preventDefault();
  requestToMongodb.delete(deleteRequestComplete);
}

const deleteRequestComplete = function(){
  countryView.clear();
}

window.addEventListener('load', appStart);
