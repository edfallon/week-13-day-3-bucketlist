const Request = require('./services/request.js');
const CountryView = require('./views/countryView');
const MapWrapper = require('./views/mapWrapper.js');


const countryView = new CountryView();
const requestToRemoteAPI = new Request('https://restcountries.eu/rest/v2/all');
const requestToMongodb = new Request('http://localhost:3000/api/countries');


const appStart = function(){
  requestToRemoteAPI.get(getAllCountries);
  requestToMongodb.get(populateBucketlist);

  const createDeleteButton = document.querySelector("#deleteButton");
  createDeleteButton.addEventListener("click", handleDeleteButttonClick);

  const mapDiv = document.getElementById("main-map");
  const glasgow = [55.854979, -4.243281];
  const zoomLevel = 1;
  mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
}





const getAllCountries = function(allCountries){
  populateDropdown(allCountries);
  const dropdownList = document.querySelector("#countries-dropdown");
  dropdownList.addEventListener("change", function(){
    selectedDropdownCountry = allCountries[this.value];
    const selectedCountryCoords = selectedDropdownCountry.latlng;
    const selectedCountryFlag = selectedDropdownCountry.flag;
    mainMap.moveTo(selectedCountryCoords, selectedCountryFlag);
  })
  const addButton = document.querySelector('#add');
  addButton.addEventListener("click", function(){
    handleAddToBucketList(selectedDropdownCountry);
  })
}



const handleAddToBucketList = function(country){
  requestToMongodb.post(country, requestToSaveCountry);
  requestToMongodb.get(populateBucketlist);

}

const requestToSaveCountry = function(savedCountry){
  countryView.addCountry(savedCountry);
}

const populateBucketlist = function(allCountriesFromMongo){
  const ul = document.querySelector("#selected-countries");
  ul.innerHTML = "";
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
