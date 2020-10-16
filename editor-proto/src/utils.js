

export const secsToString = (progress) => {
    return (progress/60 < 10 ? '0' : '') + (parseInt(progress/60)) + ':' + (parseFloat(progress - parseInt(progress/60)*60).toFixed(1));
}
