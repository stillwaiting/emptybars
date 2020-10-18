import React from 'react';

import './Pages.scss';

function Pages({ pages, onPagesUpdated }) {
    const handleAddPage = () => {
        const url = prompt('Please enter page`s image URL');
        // TODO: add validation
        if (url) {
            const id = new Date().getTime().toString();
            onPagesUpdated(pages.push({
                url,
                id
            }));
            onPagesUpdated(pages);
        }
    }

    return <div className='pages'>
            <div className='scrolling'>
                <div className='addPage' onClick={handleAddPage}>Add page (jpg/png)</div>
                {pages.map((p, idx) =>
                    <div className='page'>
                        <div>Page #{idx + 1}</div>
                        <div><img src={p.url} /></div>
                    </div>
                )}
            </div>
    </div>
}

export default Pages;