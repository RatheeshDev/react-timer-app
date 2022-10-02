import React, { Component } from "react";
import Countdown from "./Components/Countdown";
import "./Timers.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Timers">
          <Countdown />
        </div>
      </div>
    );
  }
}

export default App;