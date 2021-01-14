
export const stringToSecs = (str: string) => {
    var [mins, secs] = str.split(':', 2);
    return parseInt(mins) * 60 + parseFloat(secs);
}

export const secsToString = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const minsStr = (mins < 10 ? '0' : '') + mins;
    const secsWithoutMins = (secs - mins * 60);
    const secsStr = (secsWithoutMins < 10)
        ? ('0' + secsWithoutMins.toFixed(1))
        : secsWithoutMins.toFixed(1);
    return `${minsStr}:${secsStr}`;
}