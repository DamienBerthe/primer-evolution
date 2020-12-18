const Position = require('./position.js');

function hunt(currentPosition, target, directionSwitch){
        if(directionSwitch === true){
            if(currentPosition.x < target.x){
                return new Position(currentPosition.x + 1, currentPosition.y)
            }
            else if(currentPosition.x > target.x){
                return new Position(currentPosition.x - 1, currentPosition.y)
            }
            else if(currentPosition.x === target.x){
                if(currentPosition.y < target.y){
                    return new Position(currentPosition.x, currentPosition.y + 1)
                }
                else if(currentPosition.y > target.y){
                    return new Position(currentPosition.x, currentPosition.y - 1)
                }
            }
        }
        else{
            if(currentPosition.y < target.y){
                return new Position(currentPosition.x, currentPosition.y + 1)
            }
            else if(currentPosition.y > target.y){
                return new Position(currentPosition.x, currentPosition.y - 1)
            }
            else if(currentPosition.y === target.y){
                if(currentPosition.x < target.x){
                    return new Position(currentPosition.x + 1, currentPosition.y)
                }
                else if(currentPosition.x > target.x){
                    return new Position(currentPosition.x - 1, currentPosition.y)
                }
            }
        }
    }

module.exports = hunt;