/**
 * Searches for "segmentsData" script(json) tag
 *
 * @param callback($element, data))
 */
export const initSegmentsPlayer = (callback) => {
    console.log('initSegmentsPlayer');
    if (window.segmentsPlayer) {
        console.log('segmentsPlayer found, quit');
        return;
    }
    window.segmentsPlayer = {
        initialized: false,
        interval: false
    };

    window.segmentsPlayer.interval = setInterval(() => {
        console.log('checking segmentsData node');
        if (document.getElementById('segmentsData')) {
            console.log('found!');
            if (window.segmentsPlayer.initialized) {
                console.log('initialised!');
                clearInterval(window.segmentsPlayer.interval);
                window.location.reload();
                return;
            }
            console.log('initialise');
            window.segmentsPlayer.initialized = true;
            const data = JSON.parse(document.getElementById('segmentsData').innerHTML.trim());
            const parent = document.getElementById('segmentsData').parentNode;
            document.getElementById('segmentsData').remove();
            callback(parent, data);
        }
    }, 1000);
}