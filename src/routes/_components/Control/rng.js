export const rng = (low, high) => {
    let range = Math.abs(high - low);
    return (Math.random() * range) + low;
} 