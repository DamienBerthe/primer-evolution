class Map {
    constructor(size, fillingRate) {
        this.size = size;
        this.fillingRate = fillingRate;
        this.grid = [];
        this.startingPositions = [];
        for (let i = 2; i < this.size - 2; i++) {
            this.startingPositions.push([0, i, 1, i])
            this.startingPositions.push([this.size - 1, i, this.size - 2, i])
        }

        for (let i = 2; i < this.size - 2; i++) {
            this.startingPositions.push([i, 0, i, 1])
            this.startingPositions.push([i, this.size - 1, i, this.size - 2])
        }

        for (let i = 0; i < this.size; i++) {
            let line = [];
            for (let j = 0; j < this.size; j++) {
                line.push([])
            }
            this.grid.push(line);
        }

        for (let i = 0; i < Math.floor((this.size) * (this.size) * this.fillingRate); i++) {
            let x = Math.floor(Math.random() * this.size );
            let y = Math.floor(Math.random() * this.size );
            if(this.grid[x][y].includes(2) === true){
                do {
                    x = Math.floor(Math.random() * this.size );
                    y = Math.floor(Math.random() * this.size );
                } while (this.grid[x][y].includes(2) === true)
            }
            this.grid[x][y].push(2);
        }
    }

    reset() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            let line = [];
            for (let j = 0; j < this.size; j++) {
                line.push([])
            }
            this.grid.push(line);
        }
        for (let i = 0; i < Math.floor((this.size) * (this.size) * this.fillingRate); i++) {
            let x = Math.floor(Math.random() * this.size );
            let y = Math.floor(Math.random() * this.size );
            if(this.grid[x][y].includes(2) === true){
                do {
                    x = Math.floor(Math.random() * this.size );
                    y = Math.floor(Math.random() * this.size );
                } while (this.grid[x][y].includes(2) === true)
            }
            this.grid[x][y].push(2);
        }
    }
}
export default Map
// module.exports = Map;