var CountryView = function(){
  this.country = [];
}

CountryView.prototype.addCountry = function(country) {
  this.country.push(country);

}

module.exports = CountryView;
