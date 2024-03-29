export const getPattern = (pulses, steps) => {
    // Create the two arrays
    let first = new Array(pulses).fill([true]);
    let s = steps - pulses;
    if (s === 0) {
        return new Array(steps).fill(true);
    }
    let second = new Array(s).fill([false]);

    let firstLength = first.length;
    let minLength = Math.min(firstLength, second.length);

    let loopThreshold = 0;
    // Loop until at least one array has length gt 2 (1 for first loop)
    while (minLength > loopThreshold) {
        // Allow only loopThreshold to be zero on the first loop
        if (loopThreshold === 0) {
            loopThreshold = 1;
        }

        // For the minimum array loop and concat
        for (var x = 0; x < minLength; x++) {
            first[x] = Array.prototype.concat.call(first[x], second[x]);
        }

        // if the second was the bigger array, slice the remaining elements/arrays and update
        if (minLength === firstLength) {
            second = Array.prototype.slice.call(second, minLength);
        }
        // Otherwise update the second (smallest array) with the remainders of the first
        // and update the first array to include onlt the extended sub-arrays
        else {
            second = Array.prototype.slice.call(first, minLength);
            first = Array.prototype.slice.call(first, 0, minLength);
        }
        firstLength = first.length;
        minLength = Math.min(firstLength, second.length);
    }

    // Build the final array
    let pattern = [];
    first.forEach((f) => {
        pattern = Array.prototype.concat.call(pattern, f);
    });
    second.forEach((s) => {
        pattern = Array.prototype.concat.call(pattern, s);
    });

    return pattern;
};
