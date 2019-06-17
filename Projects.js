const fs = require('graceful-fs');
const fsPromises = require('fs').promises
const faker = require('faker');
var path = require('path');

fs.readFile( './Customers/zulauf,-wunsch-and-farrell.json', opts = 'utf8', (err, data) => {
    projectMaker(JSON.parse(data).customers)
    if (err) {
      throw err; 
    }
  });

// fs.readdir('./Customers', (err, files) => {
//     files.forEach(file => {
//        fs.readFile( './Customers/' + file, opts = 'utf8', (err, data) => {
//             projList = projectMaker(JSON.parse(data).customers)
//             if (err) {
//             throw err; 
//             }
//         });
//     });
// });

function getFormattedDate() {
    const start = new Date(2012, 0, 1);
    const end = new Date();
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    reformated = ((date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear());
    return reformated;
}

const randomNumber = () => {
    return Math.random()
  }

const randomCoordinates = (base) => {
    return Math.round(randomNumber() * 10000) / 100000 + base;
  }

projectMaker  = async customers => {
    for (customer in customers){
        let projList={};
        let project = [];
        let filePath = ''
        let numberOfProjects = Math.round(Math.random() * 20)
        console.log(JSON.parse(customer))
        const projectAssetQuantity = Math.floor(customer[1].assetCount/numberOfProjects);
        while(numberOfProjects--){
            projectName = customer[1].city + ' ' + faker.fake('{{name.jobArea}} ') + getFormattedDate();
            projectLink = projectName.replace(/\s/g , "-").toLowerCase()
            project.push({ 
                name: projectName,
                city: customer[1].city, 
                address: [faker.fake('{{address.streetAddress}}')][0],
                lat: randomCoordinates(customer[1].lat[0]),
                lng: randomCoordinates(customer[1].lng[0]),
                assetCount: projectAssetQuantity,
                levelData: projectLink
            })
            filePath = '' + projectLink + '.json';
            projList = {projects: project};
        }
        // console.log(customer[1].levelData, filePath)
        await fsPromises.writeFile(path.join('projects', filePath), JSON.stringify(projList, null, 3), 'utf8')
            .then(() => {
                console.log('JSON saved');
              })
              .catch(er => {
                console.log(er);
              });
    }
}


