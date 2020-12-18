import Organism from './organism.js'
import Map from './map.js'
import Game from './game.js'
import assignStart from './startingPositions.js'

// const Organism = require('./organism.js');
// const Map = require('./map.js');
// const Game = require('./game.js');
// const assignStart = require('./startingPositions.js');

const map1 = new Map(50, .2);
let days = 0;

let x = [];
for (let i = 0; i < 20; i++) {
    x.push(new Organism(map1));
}
assignStart(x, map1);
const game1 = new Game(x, map1);

for (let i = 0; i < 100; i++) {
    days++;
    //  console.log('Day',days);
    //  console.log('number of organisms', game1.array.length);
    game1.move();
    game1.day();
}

let Days = 'Day ' + days
let number = 'number of organisms ' + game1.array.length
let average_speed = 'average speed : ' + game1.array.reduce((accumulator, currentValue) => ({ speed: accumulator.speed + currentValue.speed })).speed / game1.array.length
let average_perception = 'average perception : ' + game1.array.reduce((accumulator, currentValue) => ({ perception: accumulator.perception + currentValue.perception })).perception / game1.array.length
let average_size = 'average size : ' + game1.array.reduce((accumulator, currentValue) => ({ size: accumulator.size + currentValue.size })).size / game1.array.length

let answer = Days + "\n" + number + "\n" + average_speed + "\n" + average_perception + "\n" + average_size
console.log(answer)

function kek(numberDays, fillingRate, population) {
    const map1 = new Map(50, fillingRate);
    let days = 0;

    let x = [];
    for (let i = 0; i < population; i++) {
        x.push(new Organism(map1));
    }
    assignStart(x, map1);
    const game1 = new Game(x, map1);

    for (let i = 0; i < numberDays; i++) {
        days++;
        //  console.log('Day',days);
        //  console.log('number of organisms', game1.array.length);
        game1.move();
        game1.day();
    }

    let Days = 'Day ' + days
    let number = 'number of organisms ' + game1.array.length
    let average_speed = 'average speed : ' + game1.array.reduce((accumulator, currentValue) => ({ speed: accumulator.speed + currentValue.speed })).speed / game1.array.length
    let average_perception = 'average perception : ' + game1.array.reduce((accumulator, currentValue) => ({ perception: accumulator.perception + currentValue.perception })).perception / game1.array.length
    let average_size = 'average size : ' + game1.array.reduce((accumulator, currentValue) => ({ size: accumulator.size + currentValue.size })).size / game1.array.length

    let answer = Days + "\n" + number + "\n" + average_speed + "\n" + average_perception + "\n" + average_size
    return answer
}

export default kek ;
//module.exports = kek;