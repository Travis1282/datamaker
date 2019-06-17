import Faker from 'faker'
import drill from '../../../images/assets/drill.jpeg';
import electricRopeShovel from '../../../images/assets/electric-rope-shovel.jpeg';
import excavator from '../../../images/assets/excavator.jpeg';
import fellerBuncher from '../../../images/assets/feller-buncher.jpeg';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const makeId  = () => {
  var text = "";
  var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 3; i++){
    text += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
  }
   text +=  Math.round( Math.random() * (9999999 - 1000000) + 1000000 );
  
  return text;
}

const randomCoordinates = (base) => {
  return Math.round(randomNumber() * 10000) / 100000 + base;
}

const randomNumber = () => {
  return Math.random()
}

const choosePic = () => {
  const selectionId = Math.floor(Math.random() * 4)
  let selection = ''
  switch (selectionId) {
    case 0:
      selection = drill;
      break;
    case 1:
      selection = electricRopeShovel;
      break;
    case 2:
      selection = excavator;
      break;
    default:
      selection = fellerBuncher;
  }
  return selection
}


const newAsset = () => {
  const statusChance = Math.random();
  return {
    name: makeId(),
    pic: choosePic(),
    serviceMeter: Math.random() * ( 9999999 - 1000000) + 1000000,
    location: Faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}}, {{address.zipCode}} "),
    lat: randomCoordinates(41.84), // chicago
    lng: randomCoordinates(-87.73), // chicago
    // lat: randomCoordinates(40.69),//Peoria
    // lng: randomCoordinates(-89.58),//Peoria    
    // lat: randomCoordinates(42.27),//Rockford
    // lng: randomCoordinates(-89.09),//Rockford
    connection:       
      statusChance > 0.1
      ? "true"
      : "false",
    health: Math.floor(Math.random() * 100),
    nextService: Math.floor(Math.random() * 100),
    tasks: Math.floor(Math.random() * 20),
    fuelLevel: Math.floor(Math.random() * 100),
    usage:[
      {
        "id": "delay-shutdown",
        "label": "Delayed Engine Shutdown",
        "value": Math.floor(Math.random() * 100)
    },
    {
        "id": "engine-off",
        "label": "Key On - Engine Off",
        "value": Math.floor(Math.random() * 100)
    },
    {
        "id": "load-and-carry",
        "label": "Load and Carry",
        "value": Math.floor(Math.random() * 100)
    },
    {
        "id": "loading",
        "label": "Loading",
        "value": Math.floor(Math.random() * 100)
    },{
        "id": "other",
        "label": "Other",
        "value": Math.floor(Math.random() * 100)
    },{
        "id": "pile-cleanup",
        "label": "Pile Cleanup",
        "value": Math.floor(Math.random() * 100)
    },{
        "id": "roading",
        "label": "Roading",
        "value": Math.floor(Math.random() * 100)
    },{
        "id": "waiting",
        "label": "Waiting",
        "value": Math.floor(Math.random() * 100)
      }
    ]
  };
};



export function makeData(len) {
  return range(len).map(d => {
    return {
      ...newAsset(),
    };
  });
}
