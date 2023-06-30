/* dependencies */
import { useState, useEffect } from "react";
import React from "react";

/* styles */
import './styles/InputRange.css';

// component un input range customisé
const InputRange = ({ label, unit, min, max, value, step, onChange }) => {
    // hook fonctionnel
    const [minValue, setMinValue] = useState(value ? value.min : min);
    const [maxValue, setMaxValue] = useState(value ? value.max : max);

    // update les values min max 
    useEffect(() => {
        if (value) {
            setMinValue(value.min);
            setMaxValue(value.max);
        }
    }, [value]);

    // ajuste le niveau du range minimum
    const handleMinChange = e => {
        e.preventDefault();

        const newMinVal = Math.min(+e.target.value, maxValue - step);

        if (!value) setMinValue(newMinVal);

        onChange({ min: newMinVal, max: maxValue });
    };
    
    // ajuste le niveau du range maximum
    const handleMaxChange = e => {
        e.preventDefault();

        const newMaxVal = Math.max(+e.target.value, minValue + step);

        if (!value) setMaxValue(newMaxVal);

        onChange({ min: minValue, max: newMaxVal });
    };

    return (
        <div class="InputRangeWrapper">

            <div className="InputRangeTitleWrapper">
                <label className="InputRangeTitle" htmlFor={label}>{label}</label>
            </div>
            

            <div class="InputRangeInputWrapper">

                <input
                    className="InputRangeInput1"
                    type="range"
                    value={minValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMinChange}
                />

                <input
                    className="InputRangeInput2"
                    type="range"
                    value={maxValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMaxChange}
                />

            </div>


            <p className="InputRangeDetail">{minValue} {unit} - {maxValue} {unit}</p>
        </div>
    )
}

export default InputRange;