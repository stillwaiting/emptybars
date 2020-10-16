import React, { useState, useRef, useEffect } from 'react';

function PagesList({ pages, onPagesUpdated }) {
    const handleAddPage = () => {
        const url = prompt("Please enter page's image URL")
        if (url) {
            const id = new Date().getTime();
            onPagesUpdated(pages.push({
                url,
                id
            }));
            onPagesUpdated(pages);
        }
    }

    return <div className="pagesList">
        <div onClick={handleAddPage}>Add page (jpg/png)</div>
        {pages.map((p, idx) =>
            <div>
                Page #{idx+1}
                <img src={p.url} />
            </div>
        )}
    </div>
}

export default PagesList;