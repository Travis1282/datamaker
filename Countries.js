const fs = require('fs');
const faker = require('faker');
const cities =require('cities.json');
const countries = require('countries-list');

let continents = {
    "AS": "Asia",
    "EU": "Europe",
    "NA": "North America",
    "SA": "South America"
}

let activeCountries = {};

countryFinder = () => {
    Object.entries(countries.countries).forEach((country)=>{
        foundCountry = Object.entries(country[1]);
        const name = foundCountry[0][1];
        const continent = foundCountry[3][1];
        const abbreviation  = country[0];
        Object.keys(continents).find((activeContinent)=>{
            if (activeContinent === continent){
                activeCountries[abbreviation]= {name: [name][0], abbreviation: [abbreviation][0] }
            }
        })
    })

}
countryFinder()
fs.writeFile('countries.json', JSON.stringify(activeCountries, null, 3), 'utf8', (err)=>{
    if (err) throw err;
});
