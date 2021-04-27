export const clip = (i, low, high) => {
    return Math.min(Math.max(i, low), high)
}