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
export const scale = (i, iMin, iMax, oMin, oMax) => {
    return mapRange(i, iMin, iMax, oMin, oMax);
};

/**
 * Returns remainder of a division floored 
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const fmod = (a, b) => {
    return Number((a - Math.floor(a / b) * b).toPrecision(8));
};

/**
 * Wrap a value between a minimum and maximum mapRange
 * @date 07/05/2023 - 14:24:35
 *
 * @param {*} i
 * @param {*} min
 * @param {*} max
 * @returns {*}
 */
export const wrap = (i, min, max) => {
    let retVal;
    let range = max - min;
    if (i < max && i >= min) {
        return i;
    }
    if (max == min) {
        return min;
    }
    if (i < min) {
        retVal = i;
        while (retVal < min) retVal += range;
    } else retVal = fmod(i - min, range) + min;
    return retVal;
};

/**
 * Interpolate between two values
 *
 * @export
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @returns {number}
 */
export function linearInterp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

Array.prototype.rotate = (() => {
    const unshift = Array.prototype.unshift;
    const splice = Array.prototype.splice;

    return function (count) {
        var len = this.length >>> 0,
            count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();

export const create_2d_array= (rows: number, cols: number, defaultValue: any) => {
    return Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
}
