import React, { Component } from 'react';
import DailyWeather from './DailyWeather';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="title"> Weather Application </div>
        </div>
        <DailyWeather />
      </div>
    );
  }
}

export default App;
