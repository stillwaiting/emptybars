
export const secsToString = (secs) => {
    const mins = parseInt(secs / 60);
    const minsStr = (mins < 10 ? '0' : '') + mins;
    const secsStr = (secs - mins * 60).toFixed(1);
    return `${minsStr}:${secsStr}`;
}

export const stringToSecs = (str) => {
    var [mins, secs] = str.split(':', 2);
    console.log(parseInt(mins), parseFloat(secs), parseInt(mins) * 60 + parseFloat(secs));
    return parseInt(mins) * 60 + parseFloat(secs);
}
