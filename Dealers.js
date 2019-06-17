const fs = require('fs');
const faker = require('faker');
const cities = require('./cities.json');

let dealersList = [];
let dealerCount = 0;

const randomNumber = () => {
    return Math.random()
  }

const randomCoordinates = (base) => {
    return Math.round(randomNumber() * 10000) / 100000 + base;
  }


dealerMaker = () => {
    Object.entries(cities).forEach((city)=>{
        if (Math.round(Math.random() * 1)){
            let numberOfDealers = Math.round(Math.random() * 2)
            while(numberOfDealers--){
                companyName = faker.fake('{{company.companyName}}');
                companyLink = companyName.replace(/\s/g , "-").toLowerCase()
                dealersList.push ({ 
                    name: companyName[0],
                    city: [city[0]][0], 
                    address: [faker.fake('{{address.streetAddress}}')][0],
                    lat: randomCoordinates([city[1].lat][0]),
                    lng: randomCoordinates([city[1].lng][0]),
                    levelData: companyLink,
                    assetCount: Math.floor(Math.random() * 2000000)
                })
                dealerCount += 1; 
            }
        }
    })
    console.log(dealerCount)
}

dealerMaker()

const allDealers = {Dealers: dealersList}

fs.writeFile('./Dealers.json', JSON.stringify(allDealers), 'utf8', (err)=>{
    if (err) throw err;
});
