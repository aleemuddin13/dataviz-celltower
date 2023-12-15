import React from 'react';
import PropTypes from 'prop-types';

import styles from './tooltip.module.css'


const Tooltip = ({ interactionData }) => {
    if(!interactionData){
        return
    }

    const {x, y, text} = interactionData

    const positionStyle = {
        background: '#fff',
        position: 'absolute',
        border: "1px solid #f5f5f5",
        top: y+10,
        left: x-50,
        width: '150px',
        transform: 'translate(-100%, -100%)',
        "box-shadow": "3px 3px 3px rgb(0 0 0 / 10 %)"
    };
    
    return (
        <div className="tooltip" style={positionStyle}>
            <h4 style={{color: 'black', margin: '2px'}}>{text}</h4>
        </div>
    );
};


export default Tooltip;
