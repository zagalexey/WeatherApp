import React from 'react';
import '../styles/BgWrapper.css'

const BgWrapper = (props: any) => {
    return (
        <div className={'bg-wrapper'}>
            {props.children}
        </div>
    );
};

export default BgWrapper;