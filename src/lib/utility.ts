/**
 * A direct implementation of the Max scale object
 *
 * @param {number} x
 * @param {number} imin
 * @param {number} imax
 * @param {number} omin
 * @param {number} omax
 * @param {number} exp
 * @returns {number}
 */
export const max_scale = (x: number, imin: number, imax: number, omin: number, omax: number, exp: number) => {
    // duped from https://docs.cycling74.com/max8/refpages/scale
    return (x - imin) / (imax - imin) == 0
        ? omin
        : (x - imin) / (imax - imin) > 0
        ? omin + (omax - omin) * Math.pow((x - imin) / (imax - imin), exp)
        : omin + (omax - omin) * -Math.pow((-x + imin) / (imax - imin), exp);
}

/**
 * Create a standardised room identity from a prefix and a code
 *
 * @param {string} prefix
 * @param {string} code
 * @returns {string}
 */
export const createRoomID = (prefix: string, code: string) => `${prefix}.${code}`;

/**
 * Convert MIDI values to frequency values
 *
 * @export
 * @param {number} midi
 * @returns {number}
 */
export const freqMap = (midi: number) => {
    return Math.pow(2, midi / 12.0);
}

/**
 * Clip a value between a minima and maxima
 *
 * @param {number} i
 * @param {number} low
 * @param {number} high
 * @returns {*}
 */
export const clip = (i: number, low: number, high: number) => {
    return Math.min(Math.max(i, low), high);
};

/**
 * Description
 * @param {number} i
 * @param {number} iMin
 * @param {number} iMax
 * @param {number} oMin
 * @param {number} oMax
 * @returns {number}
 */
export const mapRange = (i: number, iMin: number, iMax: number, oMin: number, oMax: number) => {
    return ((i - iMin) * (oMax - oMin)) / (iMax - iMin) + oMin;
};

/**
 * Description
 * @param {number} i
 * @param {number} iMin
 * @param {number} iMax
 * @param {number} oMin
 * @param {number} oMax
 * @returns {number}
 */
export const scale = (i: number, iMin: number, iMax: number, oMin: number, oMax: number): number => {
    return mapRange(i, iMin, iMax, oMin, oMax);
};

/**
 * Wraps a number within a specified range.
 * @param i The number to wrap.
 * @param min The minimum value of the range.
 * @param max The maximum value of the range.
 * @returns The wrapped number.
 */
export const wrap = (i: number, min: number, max: number): number => {
    const range = max - min;
    const normalized = (i - min) % range;
    return normalized >= 0 ? normalized + min : normalized + max;
};

/**
 * Linearly interpolates between two numbers.
 * @param a - The starting value.
 * @param b - The ending value.
 * @param t - The interpolation factor.
 * @returns The interpolated value.
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

Array.prototype.rotate = (() => {
    const unshift = Array.prototype.unshift;
    const splice = Array.prototype.splice;

    return (count: number) => {
        var len = this.length >>> 0,
            count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();

export const create_2d_array= (rows: number, cols: number, defaultValue: any) => {
    return Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
}
