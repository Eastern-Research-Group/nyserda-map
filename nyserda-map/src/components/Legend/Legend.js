import React from 'react';
import legend from '../../images/Probability.PNG';
import './Legend.css';

const ColorBox = (props) => (
    <div className={`nyserda-color-box nyserda-color-${props.value}`} />
);

export default props => (
    <div className="nyserda-legend">
        {/*<img src={legend} className="nyserda-legend-image" alt="legend" />*/}
        <header className="nyserda-legend-header">
            Probability that area is marshland
        </header>
        <ul className="nyserda-probability">
            <li><ColorBox value={0}/>0</li>
            <li><ColorBox value={10}/>10</li>
            <li><ColorBox value={20}/>20</li>
            <li><ColorBox value={30}/>30</li>
            <li><ColorBox value={40}/>40</li>
            <li><ColorBox value={50}/>50</li>
            <li><ColorBox value={60}/>60</li>
            <li><ColorBox value={70}/>70</li>
            <li><ColorBox value={80}/>80</li>
            <li><ColorBox value={90}/>90</li>
            <li><ColorBox value={100}/>100</li>
        </ul>
    </div>
);
