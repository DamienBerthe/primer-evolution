const Position = require('./position.js');

function wander(currentPosition, previousPosition) {
    let vector = []
    let x = currentPosition.x - previousPosition.x
    let y = currentPosition.y - previousPosition.y
    let z = 0
    vector.push(x)
    vector.push(y)
    let direction = ''
    if (vector[0] === -1 && vector[1] === 0) {
        direction = 'up'
    }
    else if (vector[0] === 0 && vector[1] === 1) {
        direction = 'right'
    }
    else if (vector[0] === 1 && vector[1] === 0) {
        direction = 'down'
    }
    else {
        direction = 'left'
    }
    // eslint-disable-next-line
    switch (direction) {
        case 'up':
            z = Math.random()
            if (z <= .5) {
                return [new Position(currentPosition.x - 1, currentPosition.y), currentPosition]
            }
            else if (.5 < z && z <= .75) {
                return [new Position(currentPosition.x, currentPosition.y - 1), currentPosition]
            }
            else {
                return [new Position(currentPosition.x, currentPosition.y + 1), currentPosition]
            }
        case 'right':
            z = Math.random()
            if (z <= .5) {
                return [new Position(currentPosition.x, currentPosition.y + 1), currentPosition]
            }
            else if (.5 < z && z <= .75) {
                return [new Position(currentPosition.x - 1, currentPosition.y), currentPosition]
            }
            else {
                return [new Position(currentPosition.x + 1, currentPosition.y), currentPosition]
            }
        case 'down':
            z = Math.random()
            if (z <= .5) {
                return [new Position(currentPosition.x + 1, currentPosition.y), currentPosition]
            }
            else if (.5 < z && z <= .75) {
                return [new Position(currentPosition.x, currentPosition.y - 1), currentPosition]
            }
            else {
                return [new Position(currentPosition.x, currentPosition.y + 1), currentPosition]
            }
        case 'left':
            z = Math.random()
            if (z <= .5) {
                return [new Position(currentPosition.x, currentPosition.y - 1), currentPosition]
            }
            else if (.5 < z && z <= .75) {
                return [new Position(currentPosition.x - 1, currentPosition.y), currentPosition]
            }
            else {
                return [new Position(currentPosition.x + 1, currentPosition.y), currentPosition]
            }
    }
}

module.exports = wander;