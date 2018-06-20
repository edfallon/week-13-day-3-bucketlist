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

Request.prototype.post = function(quote, next) {
  // console.log(quote);
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");//tell it what kind of data it's getting
  request.addEventListener("load", function(){
    if (this.status !== 201) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  request.send(JSON.stringify(quote));
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map