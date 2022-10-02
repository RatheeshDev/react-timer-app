import React, {useState, useEffect, useRef} from 'react'
import TimerInput from './TimerInput';
import "../styles/timer-app.css"

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}



const Countdown = () => {
  const timeInput = useRef(null);
  const initialValue = timeInput.current?? 180;
  const [secondsRemaining, setSecondsRemaining] = useState(initialValue)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60

  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(180)
  }
  const timeHandler = (event) => {
    setSecondsRemaining(event.target.value)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  )
  return (
    <div className="timer-app">
      <TimerInput value={secondsRemaining} ref={timeInput} handleChange={timeHandler}/>
      <button onClick={handleStart} type="button">
        Start
      </button>
      <button onClick={handleStop} type="button">
        Stop
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
      <div style={{padding: 20}}>
        {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>
    </div>
  )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')

export default Countdown;