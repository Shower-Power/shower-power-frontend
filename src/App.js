import React from 'react';

import Button from './Button';
// import Data from './Data';
import './App.css';

const axios = require('axios');


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      showerIsOn: false,
      currentShowerId: null,
      currentTemperature: null,
      currentHumidity: null,
      initialTemperature: null,
      initialHumidity: null,
      peakTemperature: 0,
      peakHumidity: 0,
      showerStartedAt: null,
      durationMessage: '',
      duration: null,
      timer: null
    }
  }

  toggleShower = () => {
    console.log(this.state.showerIsOn)
    this.state.showerIsOn ? this.endShower() : this.startShower();
    const showerIsOn = !this.state.showerIsOn
    this.setState({showerIsOn});
  }

  startShower (){
    this.setState({showerStartedAt: Date.now()})
    axios.post('https://shower-power.herokuapp.com/api/v1/showers', {})
      .then(res => {
        this.setState({currentShowerId: res.data._id})
      }).catch(err => console.log(err))
    this.getInitialData();
  }

  endShower = () => {
    const duration = Date.now() - this.state.showerStartedAt;
    this.calculateDuration()
    const {initialTemperature, initialHumidity, peakHumidity, peakTemperature} = this.state;
    axios.patch(`https://shower-power.herokuapp.com/api/v1/showers/${this.state.currentShowerId}`, {duration, tempBefore: initialTemperature, humidityBefore: initialHumidity, tempPeak: peakTemperature, humidityPeak: peakHumidity})
    clearInterval(this.state.timer)
  }

  getAllShowerData = () => {
    axios.get('https://shower-power.herokuapp.com/api/v1/showers/').then(res => {
      console.log(res.data)
    })
  }

  calculateDuration = () => {
      let duration = Date.now() - this.state.showerStartedAt;
      this.setState({duration})
      let durationMessage;
        const hoursDifference = Math.floor(duration/1000/60/60);
        duration -= hoursDifference*1000*60*60
        const minutesDifference = Math.floor(duration/1000/60);
        duration -= minutesDifference*1000*60
        const secondsDifference = Math.floor(duration/1000);
        durationMessage = `${minutesDifference}m ${secondsDifference}s`
      this.setState({durationMessage})
  }

  getInitialData = () => {
    this.getCurrentData();
    window.setTimeout(() => {
      this.setState({initialHumidity: this.state.currentHumidity, initialTemperature: this.state.currentTemperature})
  }, 1000);
    this.setState({timer: setInterval(() => this.checkCurrentData(), 3000)})
  }

  checkCurrentData = () => {
    console.log("checking data")
    this.getCurrentData();
    window.setTimeout(() => {
      if (this.state.currentTemperature > this.state.peakTemperature) this.setState({peakTemperature: this.state.currentTemperature})
      if (this.state.currentHumidity > this.state.peakHumidity) this.setState({peakHumidity: this.state.currentHumidity})
      }, 1000);
  }

  getCurrentData = () => {
    axios.get('https://io.adafruit.com/api/v2/valefleur/feeds/fantasticfarenheit')
      .then(currentTemperatureReading => this.setState({ currentTemperature: currentTemperatureReading.data.last_value }))
    axios.get('https://io.adafruit.com/api/v2/valefleur/feeds/huzzahhumidity')
      .then(currentHumidityReading => this.setState({currentHumidity: currentHumidityReading.data.last_value}))
  }

  render() {
    console.log(this.state);
    const data = {
      length: this.state.duration,
      averageLength: 0, //calc
      diffFromAverage: 0, //calc
      startH: this.state.initialHumidity,
      startT: this.state.initialTemperature,
      peakH: this.state.peakHumidity,
      peakT: this.state.peakTemperature
    }
    return (
      <div className="App">
        <Button type={!this.state.showerIsOn ? 'turn-shower-on' : 'turn-shower-off' } onClick={this.toggleShower}/>
        {/* <Data data={data}/> */}
      </div>
    )
  }
}

export default App;
