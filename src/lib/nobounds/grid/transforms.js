import { get } from 'svelte/store';
import { grid, setDbValue } from '$lib/nobounds/firebase-core';
import { mirror, deepCopy } from './matrix';
import { create_2d_array } from '$lib/utility';

const sendGrid = () => {
    setDbValue('grid', get(grid));
};

/**
 * Rotates a column in the grid by the specified amount.
 *
 * @param {number} amount - The amount to rotate the column by.
 * @param {number} column - The index of the column to rotate.
 */
export const rotateGridColumn = (amount, column) => {
    let tempGrid = get(grid);
    tempGrid[column].rotate(amount);
    grid.set(tempGrid);
    sendGrid();
};

export const mirrorGridHorizontal = (store, mirrorPoint) => {
    const grid = get(store);
    const t = grid.map((row) => mirror(row));
    store.set(t);
    sendGrid(store);
};

export const mirrorGridVertical = (store) => {
    const grid = get(store);
    const t = grid.map((row) => row);
    for (let i = 0; i < grid.length; i++) {
        if (i >= grid.length / 2) {
            let mirrored = grid.length - 1 - i;
            t[i] = grid[mirrored];
        }
    }
    store.set(t);
    sendGrid(store);
};

export const invertGridVertical = (store) => {
    let grid = get(store);
    const temp = deepCopy(grid);
    for (let i = grid.length - 1, j = 0; i > 0, j < grid.length; i--, j++) {
        grid[j] = temp[i];
    }
    store.set(grid);
    sendGrid(store);
};

export const shiftColumnDown = (col) => {
    let tempGrid = get(grid);
    const overflow = deepCopy(tempGrid);
    for (var i = 0; i < tempGrid.length; i++) {
        // in each row
        let below = (i + 1) % tempGrid.length;
        tempGrid[below][col] = overflow[i][col];
    }
    grid.set(tempGrid);
    sendGrid();
};

export const shiftColumnUp = (col) => {
    let tempGrid = get(grid);
    const overflow = deepCopy(tempGrid);
    for (var i = 0; i < tempGrid.length; i++) {
        let invert = tempGrid.length - i - 1;
        let above = invert - 1;

        if (above < 0) {
            above = tempGrid.length - Math.abs(0 - above);
        }
        tempGrid[above][col] = overflow[invert][col];
    }
    grid.set(tempGrid);
    sendGrid();
};

export const clearGrid = () => {
    grid.set(create_2d_array(6, 16, false));
    sendGrid();
};

export const randomiseGrid = () => {
    let tempGrid = get(grid);
    tempGrid = tempGrid.map((gridRow) => gridRow.map((cell) => Math.random() < 0.2));
    grid.set(tempGrid);
    sendGrid();
};
