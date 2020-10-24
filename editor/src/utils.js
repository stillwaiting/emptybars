
export const secsToString = (secs) => {
    const mins = parseInt(secs / 60);
    const minsStr = (mins < 10 ? '0' : '') + mins;
    const secsWithoutMins = (secs - mins * 60);
    const secsStr = (secsWithoutMins < 10)
        ? ('0' + secsWithoutMins.toFixed(1))
        : secsWithoutMins.toFixed(1);
    return `${minsStr}:${secsStr}`;
}

export const stringToSecs = (str) => {
    var [mins, secs] = str.split(':', 2);
    console.log(parseInt(mins), parseFloat(secs), parseInt(mins) * 60 + parseFloat(secs));
    return parseInt(mins) * 60 + parseFloat(secs);
}
