


export const calculateStatPercentage = (count: number, previousCount: number): string => {

    // Counts are exactly equal
    if(count === previousCount) {
        return `0.00`
    }

    // Current count is higher
    if(count > previousCount) {
        const diff = count - previousCount;

        return (diff/previousCount * 100).toFixed(2);
    }

    // Current count is lower
    const diff = previousCount - count

    return (diff/count * 100).toFixed(2)
}