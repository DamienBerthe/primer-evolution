//const Organism = require('./organism.js');
const assignStart = require('./startingPositions.js');

class Game {

    constructor(array, map) {
        this.array = array;
        this.map = map;
    }

    move() {
        do {
            this.array.forEach(e => {if(e.isDone === false){e.move()}})
        } while (!this.array.every(e => e.isDone === true))
    }



    day() {
        this.array = this.array.filter(item => item.survived === true)
        // console.log('number of organisms', this.array.length);
        // if (this.array.length > 0) {
        //     console.log('average speed :', this.array.reduce((accumulator, currentValue) => ({ speed: accumulator.speed + currentValue.speed })).speed / this.array.length);
        //     console.log('average perception :', this.array.reduce((accumulator, currentValue) => ({ perception: accumulator.perception + currentValue.perception })).perception / this.array.length);
        //     console.log('average size :', this.array.reduce((accumulator, currentValue) => ({ size: accumulator.size + currentValue.size })).size / this.array.length);
        // }

        this.map.reset();
        this.array.forEach(element => {
            element.isDone = false;
            element.survived = false;
            element.energy = element.startingEnergy;
            if (element.isFed === 2) {
                this.array.push(element.reproduce())
            }
            element.isFed = 0
        });
        assignStart(this.array, this.map);
    }
}

module.exports = Game;