import React from 'react';
import ImageAreas from "./ImageAreas";

import './FragmentPages.scss';

function FragmentPages({ pages, fragmentPages, fragmentPageAreas }) {

    return <div className='fragmentPages'>
        {pages.map((p, idx) => {
            return (fragmentPages.indexOf(p.id) >= 0) ?
                    <div className='page'>
                        <ImageAreas
                            title={`Page #${idx+1}`}
                            imgUrl={p.url} width = {500} areas={fragmentPageAreas[p.id] || [] }
                        />
                    </div>
                    : '';
        })}
    </div>;
};

export default FragmentPages;
