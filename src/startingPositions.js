import Position from './position.js';
import randomArray from './randomArray.js';
//const randomArray = require('./randomArray.js');
//const Organism = require('./organism.js');
//const Position = require('./position.js');


function assignStart(x, map) {
    var arr = randomArray.randomArray(map.startingPositions.length);
    for (let i = 0; i < x.length; i++) {
        let y = i % map.startingPositions.length;
            x[i].currentPosition = new Position(map.startingPositions[arr[y]][2], map.startingPositions[arr[y]][3])
            x[i].previousPosition = new Position(map.startingPositions[arr[y]][0], map.startingPositions[arr[y]][1])
            map.grid[x[i].currentPosition.x][x[i].currentPosition.y].push(x[i])

    }
}
export default assignStart;
//module.exports = assignStart;