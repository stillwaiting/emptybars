
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
    return parseInt(mins) * 60 + parseFloat(secs);
}

export const transformToHumanReadable = (data) => {
    const transformedData = JSON.parse(JSON.stringify(data));
    transformedData.sections.forEach(f => {
        f.start = secsToString(f.startSec);
        f.end = secsToString(f.endSec);
        delete f.startSec;
        delete f.endSec;
    });
    return transformedData;
}

export const transformFromHumanReadable = (data) => {
    const transformedData = JSON.parse(JSON.stringify(data));
    transformedData.sections.forEach(f => {
        f.startSec = stringToSecs(f.start);
        f.endSec = stringToSecs(f.end);
        delete f.start;
        delete f.end;
    });
    return transformedData;
}
