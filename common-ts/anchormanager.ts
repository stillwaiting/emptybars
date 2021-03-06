
export class AnchorManager {
    private _timer: NodeJS.Timeout;
    private _currentAnchor: string;

    constructor() {
        this._currentAnchor = window.location.hash;
        this._timer = setInterval(() => {
            if (this._currentAnchor !==  window.location.hash) {
                clearInterval(this._timer);
                window.location.reload();
            }
        }, 100);
    }

    setAnchor(anchor: string) {
        if (window.location.hash.trim() == '' || window.location.hash == '#') {
            window.location.hash = anchor;
        } else {
            window.location.replace(anchor);
        }
        this._currentAnchor = window.location.hash;
    }
}