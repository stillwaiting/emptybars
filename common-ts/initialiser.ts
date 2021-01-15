import Timeout = NodeJS.Timeout;

declare global {
    interface Window {
        sectionsPlayer: {
            initialized: boolean,
            interval: Timeout | null
        }
    }
}


/**
 * Searches for "sectionsData" script(json) tag
 *
 * @param callback($element, data))
 */
export const initSectionsPlayer = (callback: (node: Node, data: any) => void) => {
    console.log('initSectionsPlayer');
    if (window.sectionsPlayer) {
        console.log('sectionsPlayer found, nothing to initialize, quit');
        return;
    }
    window.sectionsPlayer = {
        initialized: false,
        interval: null
    };

    window.sectionsPlayer.interval = setInterval(() => {
        console.log('checking sectionsData node');
        const sectionsDataNode = document.getElementById('sectionsData');
        if (sectionsDataNode) {
            console.log('found!');
            if (window.sectionsPlayer.initialized) {
                console.log('already initialised, reloading to avoid JS conflicts');
                if (window.sectionsPlayer.interval) {
                    clearInterval(window.sectionsPlayer.interval);
                } else {
                    throw "Interval was not defined!";
                }
                window.location.reload();
                return;
            }
            console.log('initialise');
            window.sectionsPlayer.initialized = true;
            const data = JSON.parse(sectionsDataNode.innerHTML.trim());
            const parent = sectionsDataNode.parentNode;
            sectionsDataNode.remove();
            if (parent) {
                callback(parent, data);
            } else {
                throw "Parent was not found!";
            }
        }
    }, 1000);
}