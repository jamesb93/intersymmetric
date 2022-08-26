export const max_scale = (x, imin, imax, omin, omax, exp) => {
  // duped from https://docs.cycling74.com/max8/refpages/scale
  return (x - imin) / (imax - imin) == 0
    ? omin
    : (x - imin) / (imax - imin) > 0
    ? omin + (omax - omin) * Math.pow((x - imin) / (imax - imin), exp)
    : omin + (omax - omin) * -Math.pow((-x + imin) / (imax - imin), exp);
};

// return ((x-imin)/(imax-imin) == 0) ? omin : (((x-imin)/(imax-imin)) > 0) ? (omin + (omax-omin) * ((x-imin)/(imax-imin))^exp) : ( omin + (omax-omin) * -((((-x+imin)/(imax-imin)))^(exp)))

export const createRoomID = (prefix, code) => `${prefix}.${code}`;

export const freqMap = midi => {
  return Math.pow(2, midi / 12.0);
};

export const clip = (i, low, high) => {
  return Math.min(Math.max(i, low), high);
};

const fmod = (a, b) => {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
};

export const mapRange = (i, iMin, iMax, oMin, oMax) => {
  return ((i - iMin) * (oMax - oMin)) / (iMax - iMin) + oMin;
};

export const scale = (i, iMin, iMax, oMin, oMax) => {
  return mapRange(i, iMin, iMax, oMin, oMax);
};

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
