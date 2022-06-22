import React from 'react';
import '../styles/NoResultsWrapper.css'

const NoResultsWrapper = (props: any) => {
    return (
        <div className={'result-wrapper'}>
            {props.children}
        </div>
    );
};

export default NoResultsWrapper;