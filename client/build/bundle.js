/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);
const CountryView = __webpack_require__(3);
const MapWrapper = __webpack_require__(5);


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
  const zoomLevel = 2;
  mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
}





const getAllCountries = function(allCountries){
  populateDropdown(allCountries);
  const dropdownList = document.querySelector("#countries-dropdown");
  dropdownList.addEventListener("change", function(){
    selectedDropdownCountry = allCountries[this.value];
    const selectedCountryCoords = selectedDropdownCountry.latlng;
    const selectedCountryFlag = selectedDropdownCountry.flag;
    const flagImage = document.createElement('img')
    flagImage.src = selectedCountryFlag
    flagImage.width = 100;
    mainMap.moveTo(selectedCountryCoords, flagImage);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(next) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if (this.status !== 200) return;

    const responseBody = JSON.parse(this.response);
    next(responseBody);
  });
  request.send()
};

Request.prototype.post = function(country, next) {
  // console.log(quote);
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");//tell it what kind of data it's getting
  request.addEventListener("load", function(){
    if (this.status !== 201) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  request.send(JSON.stringify(country));
};

Request.prototype.delete = function (next) {
  const request = new XMLHttpRequest();
  request.open("DELETE", this.url);
  request.addEventListener('load', function(){
    if (this.status !== 204) return;
    next();
  })
  request.send();
};

module.exports = Request;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

var CountryView = function(){
  this.country = [];
}

CountryView.prototype.addCountry = function(country) {
  this.country.push(country);

}

CountryView.prototype.clear = function(country) {
  this.country = [];
  const ul = document.querySelector('#selected-countries');
  ul.innerHTML = '';
}

module.exports = CountryView;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

const MapWrapper = function(element, coords, zoom){
   //dynamic API for tiles
   const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
   //sets parameters of map
   this.map = L.map(element)
     .addLayer(osmLayer)
     .setView(coords, zoom);
   //add marker on click
   this.map.on("click", function(event){
     this.map.flyTo(event.latlng);
   }.bind(this));
}

//writes move to function which takes in a co-ord
MapWrapper.prototype.moveTo = function(latlng, flag){
   this.map.flyTo(latlng, 4);
   L.marker(latlng).addTo(this.map).bindPopup(flag).openPopup()
   //adds in a pop up with hyperlink to the wiki page
}

//function for moving to current location
// MapWrapper.prototype.currentLocation = function () {
//  this.map.locate({setView: true})
// };

module.exports = MapWrapper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map