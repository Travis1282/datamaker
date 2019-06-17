const fs = require('fs');
const faker = require('faker');
const cities = require('cities.json');
const countries = require('./countries.json')

let citiesList = {};
let cityCount = 0

cityFinder = () => {
    Object.entries(cities).forEach((city)=>{
        citiesCountry = city[1].country
        Object.keys(countries).find((country) => {
            if (citiesCountry === countries[country].abbreviation){
                const thisCity = city[1];
                citiesList[city[1].name] = thisCity ;
                cityCount += 1;
            }
        })
    })
    console.log(cityCount)
}
cityFinder()
fs.writeFile('cities.json', JSON.stringify(citiesList, null, 3), 'utf8', (err)=>{
    if (err) throw err;
});
