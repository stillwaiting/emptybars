/**
 * Searches for "fragmentsData" script(json) tag
 *
 * @param callback($element, data))
 */
export const initFragmentsPlayer = (callback) => {
    if (window.fragmentsPlayer) {
        return;
    }
    window.fragmentsPlayer = {
        initialized: false,
        interval: false
    };

    window.fragmentsPlayer.interval = setInterval(() => {
        if (document.getElementById('fragmentsData')) {
            if (window.fragmentsPlayer.initialized) {
                clearInterval(window.fragmentsPlayer.interval);
                window.location.reload();
                return;
            }
            window.fragmentsPlayer.initialized = true;
            const data = JSON.parse(document.getElementById('fragmentsData').innerHTML);
            const parent = document.getElementById('fragmentsData').parentNode;
            document.getElementById('fragmentsData').remove();
            callback(parent, data);
        }
    }, 100);
}