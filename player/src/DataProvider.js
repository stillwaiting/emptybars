import React, {useRef} from 'react';

import './DataProvider.scss';

export default function({onDataProvided}) {
    const ref = useRef(null);
    return <div className='dataProvider'>
        <h2>Paste video sections data to play:</h2>
        <div><textarea ref={ref} placeholder='Paste video sections data to play here'/></div>
        <div><button onClick={() => {
            onDataProvided(JSON.parse(ref.current.value));
        }}>Play</button></div>
    </div>;
}