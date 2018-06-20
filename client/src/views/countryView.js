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
