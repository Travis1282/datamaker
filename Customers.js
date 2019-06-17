const fs = require('graceful-fs');
const faker = require('faker');
const dealers = require('./dealers.json');

let customerCount = 0;

const randomNumber = () => {
    return Math.random()
  }

const randomCoordinates = (base) => {
    return Math.round(randomNumber() * 10000) / 100000 + base;
  }

customerMaker = () => {
        allDealers = dealers.Dealers;
        Object.entries(allDealers).forEach((dealer)=>{
        let customerList={};
        let customers = [];
        customerList = customerList.customer;
        let numberOfCustomers = Math.round(Math.random() * 20)
        let customerAssetQuantity = Math.floor(dealer[1].assetCount/numberOfCustomers);
        const dealerName = dealer[1].levelData
        while(numberOfCustomers--){
            companyName = faker.fake('{{company.companyName}}');
            projectLink = companyName.replace(/\s/g , "-").toLowerCase()
            customers.push({ 
                name: [companyName][0],
                city: dealer[1].city, 
                address: [faker.fake('{{address.streetAddress}}')][0],
                lat: randomCoordinates(dealer[1].lat[0]),
                lng: randomCoordinates(dealer[1].lng[0]),
                assetCount: customerAssetQuantity,
                levelData: projectLink
            })
            customerList = {customers: customers};
            customerCount += 1; 
        }
        fs.writeFile('./Customers/'+ dealerName +'.json', JSON.stringify(customerList, null, 3), 'utf8', (err)=>{
            if (err) throw err;
        });
    })
}

customerMaker()

