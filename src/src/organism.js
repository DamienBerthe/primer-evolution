const radar = require('./radar.js');
const hunt = require('./hunt.js');
const flee = require('./flee.js');
const wander = require('./wander.js');
const Position = require('./position.js');

class Organism {
    constructor(map) {
        this.currentPosition = undefined;
        this.previousPosition = undefined;
        this.directionSwitch = true;
        this.map = map;
        this.isFed = 0;
        this.isDone = false;
        this.survived = false;
        this.speed = 3;
        this.perception = 5;
        this.size = 5;
        this.startingEnergy = 40000;
        this.energy = this.startingEnergy;
        this.energyCost = Math.round(Math.pow(this.size, 3) * Math.round(Math.pow(this.speed, 2)) + this.perception);
        this.threshold = (Math.floor(this.map.size / 2) + 1) * this.energyCost + this.energyCost;
        this.target = undefined;
    }

    computeEnergyCost() {
        this.energyCost = Math.round(Math.pow(this.size, 3) * Math.round(Math.pow(this.speed, 2)) + this.perception);
        this.threshold = (Math.floor(this.map.size / 2) + 1) * this.energyCost + this.energyCost;
    }

    radar() {
        for (let i = 1; i <= this.perception; i++) {
            let array = radar(i, this.map.size, this.currentPosition.x, this.currentPosition.y);
            let target = array.find(element => this.map.grid[element[0]][element[1]].some(e => e.size >= this.size * 1.2) === true)
            if (target === undefined) {
                target = array.find(element => this.map.grid[element[0]][element[1]].includes(2) === true)
            }
            if (target === undefined) {
                target = array.find(element => this.map.grid[element[0]][element[1]].some(e => e.size <= this.size * .8) === true)
            }
            if (target !== undefined) {
                return new Position(target[0], target[1]);
            }
        }
    }

    move() {
        if (this.energy < this.energyCost) {
            this.isDone = true
        }

        for (let i = 0; i < this.speed; i++) {
            if (this.isDone === false) {
                if ((this.energy >= this.threshold && this.isFed < 2) || this.isFed === 0) {        
                    this.target = this.radar();
                    if (this.target === undefined) {
                        this.wander()
                    }
                    else if (this.map.grid[this.target.x][this.target.y].some(e => e.size >= this.size * 1.2) === true) {
                        this.flee()
                    }
                    else {
                        this.hunt()
                    }
                }
                else {
                    this.goHome()
                }
            }
        }
    }

    wander() {
        this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this), 1)
        let arr = wander(this.currentPosition, this.previousPosition);
        if (arr[0].x < 0 || arr[0].x > this.map.size - 1 || arr[0].y < 0 || arr[0].y > this.map.size - 1) {
            do {
                arr = wander(this.currentPosition, this.previousPosition);
            } while ((arr[0].x < 0 || arr[0].x > this.map.size - 1 || arr[0].y < 0 || arr[0].y > this.map.size - 1) === true)
        }

        this.currentPosition = arr[0];
        this.previousPosition = arr[1];
        this.energy -= this.energyCost;
        this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
    }

    hunt() {
        this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this), 1)
        this.target = this.radar();
        if (this.target !== undefined) {
            this.previousPosition = this.currentPosition;
            this.currentPosition = hunt(this.currentPosition, this.target, this.directionSwitch);
            this.directionSwitch = !this.directionSwitch;
        }

        if (this.map.grid[this.currentPosition.x][this.currentPosition.y].includes(2) === true) {
            this.isFed++;
            let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(2)
            this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
        }

        if (this.map.grid[this.currentPosition.x][this.currentPosition.y].some(e => e.size <= this.size * .8)) {
            let prey = this.map.grid[this.currentPosition.x][this.currentPosition.y].find(e => e.size <= this.size * .8)
            this.isFed++;
            let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(prey)
            this.map.grid[this.currentPosition.x][this.currentPosition.y][index].isDone = true;
            this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
        }

        if ((this.currentPosition.x === 0 || this.currentPosition.x === this.map.size - 1
            || this.currentPosition.y === 0 || this.currentPosition.y === this.map.size - 1) && this.energy === 0 && this.isFed > 0) {
            this.isDone = true;
        }
        this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
        this.energy -= this.energyCost;
    }

    flee(){

        this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this), 1)
        this.target = this.radar();
        if (this.target !== undefined) {
            this.previousPosition = this.currentPosition;
            this.currentPosition = flee(this.currentPosition, this.target, this.map.size);
            this.directionSwitch = !this.directionSwitch;
        }

        if (this.map.grid[this.currentPosition.x][this.currentPosition.y].includes(2) === true) {
            this.isFed++;
            let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(2)
            this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
        }

        if (this.map.grid[this.currentPosition.x][this.currentPosition.y].some(e => e.size <= this.size * .8)) {
            let prey = this.map.grid[this.currentPosition.x][this.currentPosition.y].find(e => e.size <= this.size * .8)
            this.isFed++;
            let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(prey)
            this.map.grid[this.currentPosition.x][this.currentPosition.y][index].isDone = true;
            this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
        }

        if ((this.currentPosition.x === 0 || this.currentPosition.x === this.map.size - 1
            || this.currentPosition.y === 0 || this.currentPosition.y === this.map.size - 1) && this.energy === 0 && this.isFed > 0) {
            this.isDone = true;
        }

        this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);

        this.energy -= this.energyCost;
    }

    goHome() {
        let x = this.currentPosition.x;
        let y = this.currentPosition.y;
        let arr = [];
        arr.push(x, this.map.size - 1 - x, y, this.map.size - 1 - y);
        let min = Math.min(...arr);
        if (min !== 0) {
            if (min === arr[0]) {
                do {
                    let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this)
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
                    this.currentPosition.x = this.currentPosition.x - 1;
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
                    this.energy -= this.energyCost;
                } while (this.currentPosition.x !== 0)
            }
            else if (min === arr[1]) {
                do {
                    let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this)
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
                    this.currentPosition.x = this.currentPosition.x + 1;
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
                    this.energy -= this.energyCost;
                } while (this.currentPosition.x !== this.map.size - 1)
            }
            else if (min === arr[2]) {
                do {
                    let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this)
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
                    this.currentPosition.y = this.currentPosition.y - 1;
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
                    this.energy -= this.energyCost;
                } while (this.currentPosition.y !== 0)
            }
            else {
                do {
                    let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this)
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
                    this.currentPosition.y = this.currentPosition.y + 1;
                    this.map.grid[this.currentPosition.x][this.currentPosition.y].push(this);
                    this.energy -= this.energyCost;
                } while (this.currentPosition.y !== this.map.size - 1)
            }
        }
        let index = this.map.grid[this.currentPosition.x][this.currentPosition.y].indexOf(this)
        this.map.grid[this.currentPosition.x][this.currentPosition.y].splice(index, 1)
        this.survived = true;
        this.isDone = true;
    }

    reproduce() {
        const organism2 = new Organism(this.map);
        organism2.size = this.size + (Math.random() < 0.5 ? -1 : 1);
        if (organism2.size < 1) {
            organism2.size = 1
        }
        organism2.speed = this.speed + (Math.random() < 0.5 ? -1 : 1);
        if (organism2.speed < 1) {
            organism2.speed = 1
        }
        organism2.perception = this.perception + (Math.random() < 0.5 ? -1 : 1);
        organism2.computeEnergyCost();
        return organism2;
    }
}

module.exports = Organism;