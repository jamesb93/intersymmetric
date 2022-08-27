export const rotate = (arr, count) => {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
};

export const random = arr => {
    for (var i = 0; i < arr.length; i++) {
        arr[i].state = Math.random() > 0.5;
    }
    return arr;
};

export const deepCopy = arr => {
    return JSON.parse(JSON.stringify(arr));
};

export const shiftColumnDown = (grid, col) => {
    let temp = deepCopy(grid); // deep copy
    for (var i = 0; i < grid.length; i++) {
        // in each row
        let below = (i + 1) % grid.length;
        grid[below][col] = temp[i][col];
    }
};

export const shiftColumnUp = (grid, col) => {
    let temp = deepCopy(grid); // deep copy
    for (var i = 0; i < grid.length; i++) {
        // in each row
        let invert = grid.length - i - 1;
        let above = invert - 1;

        if (above < 0) {
            // Wrap
            above = grid.length - Math.abs(0 - above);
        }
        grid[above][col] = temp[invert][col];
    }
};

export const mirror = arr => {
    let halfway = Math.floor(arr.length / 2);
    let temp = new Array(arr.length).fill(false);

    for (let i = 0; i < arr.length; i++) {
        if (i < halfway) {
            temp[i] = arr[i];
        } else {
            temp[i] = arr[arr.length - i - 1];
        }
    }
    return temp;
};
