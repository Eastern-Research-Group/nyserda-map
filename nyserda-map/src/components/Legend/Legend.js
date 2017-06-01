import React from 'react';
import legend from '../../images/Probability.PNG';
import './Legend.css';


export default props => (
    <div className="nyserda-legend">
        <img src={legend} className="nyserda-legend-image" alt="legend" />
    </div>
);
