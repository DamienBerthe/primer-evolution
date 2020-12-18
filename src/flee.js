const Position = require('./position.js');

function flee(currentPosition, target, size) {

    let p1 = new Position(currentPosition.x - 1, currentPosition.y)
    let p2 = new Position(currentPosition.x, currentPosition.y + 1)
    let p3 = new Position(currentPosition.x + 1, currentPosition.y)
    let p4 = new Position(currentPosition.x, currentPosition.y - 1)

    function isInside(pos) {
        if (pos.x >= 0 && pos.x < size && pos.y >= 0 && pos.y < size) {
            return true;
        }
    }

    let arr = [p1, p2, p3, p4].filter(e => isInside(e));
    let arr2 = arr.map(e => Math.abs(target.x - e.x) + Math.abs(target.y - e.y))
    let indexMax = arr2.indexOf(Math.max(...arr2))
    let pos = arr[indexMax]
    return pos;
}

module.exports = flee;