import React from 'react';

const Refresh = (props) => {
    
    return (    
        <button className="refresh-button"  title="Click to Refresh" onClick={props.onRefresh}>
        Refresh
        </button>
    );
};

export default Refresh;
