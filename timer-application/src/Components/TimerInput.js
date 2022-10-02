import React from "react";
import "../styles/time-input.css"

const TimerInput = (props) => {
    return (
      <div className="time-input">
        <h3>Enter the time in seconds</h3>
        <input type="number" ref={props.ref} value={props.value} onChange={props.handleChange} required />
      </div>
    );
}

export default TimerInput;