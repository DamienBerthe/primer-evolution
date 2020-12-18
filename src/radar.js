function radar(delta, size, x, y) {
    let array = [];
    let x2 = x - delta;
    let y2 = y;

    if (x2 >= 0) {
        array.push([x2, y2]);
    }
    do {
        x2++;
        y2++;
        if (x2 >= 0 && y2 < size) {
            array.push([x2, y2]);
        }
    } while (y2 < y + delta)

    do {
        x2++;
        y2--;
        if (x2 < size && y2 < size) {
            array.push([x2, y2]);
        }
    } while (x2 < x + delta)

    do {
        x2--;
        y2--;
        if (x2 < size && y2 >= 0) {
            array.push([x2, y2]);
        }
    } while (y2 > y - delta)

    do {
        if (delta !== 1) {
            x2--;
            y2++;
            if (x2 >= 0 && y2 >= 0) {
                array.push([x2, y2]);
            }
        }

    } while (x2 > x - delta + 1)

    return array;
}
export default radar
//module.exports = radar;
