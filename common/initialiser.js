/**
 * Searches for "segmentsData" script(json) tag
 *
 * @param callback($element, data))
 */
export const initSegmentsPlayer = (callback) => {
    if (window.segmentsPlayer) {
        return;
    }
    window.segmentsPlayer = {
        initialized: false,
        interval: false
    };

    window.segmentsPlayer.interval = setInterval(() => {
        if (document.getElementById('segmentsData')) {
            if (window.segmentsPlayer.initialized) {
                clearInterval(window.segmentsPlayer.interval);
                window.location.reload();
                return;
            }
            window.segmentsPlayer.initialized = true;
            const data = JSON.parse(document.getElementById('segmentsData').innerHTML.trim());
            const parent = document.getElementById('segmentsData').parentNode;
            document.getElementById('segmentsData').remove();
            callback(parent, data);
        }
    }, 100);
}