import React, { useState, useRef, useEffect } from 'react';

import './ImageAreas.scss';

function ImageAreas({ title, image, width, areas, onImageClicked }) {
    // var [height, setHeight] = useState(100);
    var canvasRef = useRef(null);
    var coeffOrigImageToScreenCoords;
    var height;

    if (image && image.width && image.height) {
        coeffOrigImageToScreenCoords = (width * 1.0 / image.width);
        height = parseInt(image.height * coeffOrigImageToScreenCoords);
    } else {
        coeffOrigImageToScreenCoords = -1;
        height = -1;
    }

    const drawCanvas = () => {
        if (image && image.width && image.height && canvasRef && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

            areas.forEach((a, idx) => {
                context.fillStyle = 'rgba(255, 255, 0, 0.5)';
                context.fillRect(a.x * coeffOrigImageToScreenCoords, a.y * coeffOrigImageToScreenCoords, a.width * coeffOrigImageToScreenCoords, a.height * coeffOrigImageToScreenCoords);
            });
        }
    }

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return [x, y]
    }

    const handleMouseClick = (e) => {
        const [x, y] = getCursorPosition(canvasRef.current, e);
        const origX = x / coeffOrigImageToScreenCoords;
        const origY = y / coeffOrigImageToScreenCoords;
        onImageClicked(origX, origY);
    }

    useEffect(() => {
        drawCanvas();
    });

    if (image && image.width && image.height) {
        drawCanvas();

        return (
            <div className='imageAreas'>
                <div className='canvas'>
                    <div className='title'>{title}</div>
                    <canvas width={width} height={height} ref={canvasRef} onClick={handleMouseClick}>
                    </canvas>
                </div>
            </div>
        );
    } else {
        return <div className='imageAreas'>
            <div className='canvas'>
                <div className='title'>{title}</div>
                <div>Error loading</div>
            </div>
        </div>
    }
}

export default ImageAreas;