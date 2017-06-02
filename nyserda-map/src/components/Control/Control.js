import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {layerTypes} from '../../redux/modules/control';
import './Control.css';


export default props => {
    const labels = {};
    props.years.forEach(year => labels[year] = year);
    return (
        <div className="nyserda-control">
            <div className="nyserda-data-selector">
                <select
                    name="data-selector"
                    id="data-selector"
                    value={props.area}
                    onChange={props.onSelectArea}
                >
                    <option value="" hidden>Select an area</option>
                    <option value="nassau">Nassau</option>
                    <option value="nyc">New York City</option>
                    <option value="westchester">Westchester</option>
                </select>
            </div>

            <div className={`nyserda-slider`}>
                <Slider
                    min={props.years[0]}
                    max={props.years[props.years.length - 1]}
                    value={props.selectedYear}
                    onChange={props.onChangeSlider}
                    labels={labels}
                    orientation="horizontal"/>
                {props.years.length !== 0 ? (
                    <span className="nyserda-slider-caption">
                        Year
                    </span>
                ) : null}

            </div>

            {props.years.length !== 0 ? (
                <div className="nyserda-type-checkboxes">
                    <fieldset className="nyserda-type-checkbox">
                        <label htmlFor="existing-marsh">
                            <input
                                type="checkbox"
                                id="existing-marsh"
                                value={layerTypes.EXISTING_MARSH}
                                checked={props.selectedLayerTypes.indexOf(layerTypes.EXISTING_MARSH) !== - 1}
                                onChange={props.onSelectLayerType}/>
                            <div className="nyserda-checkbox-text">
                                Marshland that existed in 2008
                            </div>
                        </label>
                    </fieldset>

                    <fieldset className="nyserda-type-checkbox">
                        <label htmlFor="new-coastal-marsh">
                            <input
                                type="checkbox"
                                id="new-coastal-marsh"
                                value={layerTypes.NEW_COASTAL_MARSH}
                                checked={props.selectedLayerTypes.indexOf(layerTypes.NEW_COASTAL_MARSH) !== - 1}
                                onChange={props.onSelectLayerType}/>
                            <div className="nyserda-checkbox-text">
                                Marshland that could emerge due to sea-level rise
                            </div>
                        </label>
                    </fieldset>
                </div>
            ) : null}


            {/*<div className="nyserda-layer-selector" id="nyserda-layers-container">*/}
            {/*{props.categories.map((category, key) => (*/}
            {/*<label*/}
            {/*key={key}*/}
            {/*htmlFor={`category-${key}`}*/}
            {/*className='nyserda-layer-checkbox'>*/}
            {/*<input*/}
            {/*type="checkbox"*/}
            {/*id={`category-${key}`}*/}
            {/*value={category}*/}
            {/*checked={props.selectedCategories.indexOf(category) !== - 1}*/}
            {/*onChange={props.onSelectCategory}/>*/}

            {/*{category}*/}

            {/*</label>*/}
            {/*))}*/}
            {/*</div>*/}
        </div>
    );
}
