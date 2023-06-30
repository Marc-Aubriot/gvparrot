/* dependencies */
import { useState } from "react";

/* styles */
import './styles/InputRange.css';

const InputRange = (props) => {
    const [minimum, setMinimum] = useState(props.min);
    const [maximum, setMaximum] = useState(props.max);
    const [minValue, setMinValue] = useState(props.min);
    const [maxValue, setMaxValue] = useState(props.max);
    const [name, setName] = useState(props.label);
    const [steps, setSteps] = useState(props.step);

    const minPos = ((minValue - minimum) / (maximum - minimum)) * 100;
    const maxPos = ((maxValue - minimum) / (maximum - minimum)) * 100;

    const handleMinChange = (e) => {
        e.preventDefault();

        const value = parseFloat(e.target.value);
        const newMinVal = Math.min(value, maxValue - steps);

        setMinValue(newMinVal);
    };

    const handleMaxChange = (e) => {
        e.preventDefault();
        
        const value = parseFloat(e.target.value);
        const newMaxVal = Math.max(value, minValue + steps);

        setMaxValue(newMaxVal);
    };

    return (
        <div className="InputRangeWrapper">
            <label htmlFor={name}>{name}</label>

            <div className="InputRangeLineWrapper">
                <input
                    type="range"
                    value={minValue}
                    min={minimum}
                    max={maximum}
                    step={steps}
                    onChange={handleMinChange}
                />

                <input
                    type="range"
                    value={maxValue}
                    min={minimum}
                    max={maximum}
                    step={steps}
                    onChange={handleMaxChange}
                />
            </div>
            
            <div class="control-wrapper">
                <div class="control" style={{ left: `${minPos}%` }} />
                <div class="rail">
                    <div
                        class="inner-rail" 
                        style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                    />
            </div>

            <div class="control" style={{ left: `${maxPos}%` }} />

      </div>


        </div>
    )
}

export default InputRange;