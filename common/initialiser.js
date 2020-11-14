/**
 * Searches for "sectionsData" script(json) tag
 *
 * @param callback($element, data))
 */
export const initSectionsPlayer = (callback) => {
    console.log('initSectionsPlayer');
    if (window.sectionsPlayer) {
        console.log('sectionsPlayer found, quit');
        return;
    }
    window.sectionsPlayer = {
        initialized: false,
        interval: false
    };

    window.sectionsPlayer.interval = setInterval(() => {
        console.log('checking sectionsData node');
        if (document.getElementById('sectionsData')) {
            console.log('found!');
            if (window.sectionsPlayer.initialized) {
                console.log('initialised!');
                clearInterval(window.sectionsPlayer.interval);
                window.location.reload();
                return;
            }
            console.log('initialise');
            window.sectionsPlayer.initialized = true;
            const data = JSON.parse(document.getElementById('sectionsData').innerHTML.trim());
            const parent = document.getElementById('sectionsData').parentNode;
            document.getElementById('sectionsData').remove();
            callback(parent, data);
        }
    }, 1000);
}