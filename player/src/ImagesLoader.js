import React, {useState , useEffect} from 'react';


export default ( { imageUrls, onImagesLoaded }) => {
    const [progress, setProgress] = useState(new Array(imageUrls.length).fill(0));

    useEffect(() => {
        const progress = new Array(imageUrls.length).fill(0);

        const interval = setInterval(() => {
            const delta = parseInt(Math.random() * 3);
            for (let idx = 0; idx < progress.length; idx++) {
                progress[idx] += delta;
                if (progress[idx] > 50) {
                    progress[idx] -= parseInt(delta/2);
                }
                if (progress[idx] > 100) {
                    progress[idx] = 100;
                }
            }
            setProgress(JSON.parse(JSON.stringify(progress)));
        }, 500);

        let totalLoaded = 0;
        const onImageLoaded = (idx) => {
            progress[idx] = 100;
            setProgress(JSON.parse(JSON.stringify(progress)));
            totalLoaded += 1;
            if (totalLoaded >= imageUrls.length) {
                onImagesLoaded(images);
                clearInterval(interval);
            }
        }

        const images = imageUrls.map((imageUrl, idx) => {
            const image = new Image();
            image.src= imageUrl;
            image.onload = () => { onImageLoaded(idx) }
            image.onerror = (e) => { console.error(e); onImageLoaded(idx) }
            return image;
        });

    }, []);

    const renderProgress = () => {
        const percent = parseInt(progress.reduce((prevVal, currVal) => prevVal + currVal, 0) / Math.max(0, progress.length));
        return parseInt(progress.reduce((prevVal, currVal) => prevVal + currVal, 0) / Math.max(0, progress.length)) + "%" +
            (percent === 100 ? '...' : '');
    }

    return <div>Loading {renderProgress()}</div>;
}