import React from 'react';

import Button from './Button';
import Data from './Data';
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
      timer: null,
      showerTimer: null,
      timeElapsed: 0,
      avgs: {
        length: null,
        maxT: null,
        maxH: null,
        incH: null,
        incT: null
      }
    }
  }

  showerTimer = () => {
    this.setState({showerTimer: setInterval(() => this.getElapsedTime(), 100)})
  }

  getElapsedTime = () => {
    this.setState({timeElapsed: this.prettyDuration(Date.now() - this.state.showerStartedAt)})
  }

  toggleShower = () => {
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
    this.showerTimer();
  }

  endShower = () => {
    const duration = Date.now() - this.state.showerStartedAt;
    this.calculateDuration()
    const {initialTemperature, initialHumidity, peakHumidity, peakTemperature} = this.state;
    const currentShower = {
      duration,
      tempBefore: initialTemperature,
      humidityBefore: initialHumidity,
      tempPeak: peakTemperature,
      humidityPeak: peakHumidity
    }
    this.getAllShowerData(currentShower);
    axios.patch(`https://shower-power.herokuapp.com/api/v1/showers/${this.state.currentShowerId}`, {      duration,
    tempBefore: initialTemperature,
    humidityBefore: initialHumidity,
    tempPeak: peakTemperature,
    humidityPeak: peakHumidity})
    clearInterval(this.state.timer)
    clearInterval(this.state.showerTimer)
  }

  getAllShowerData = (currentShower) => {
    axios.get('https://shower-power.herokuapp.com/api/v1/showers/').then(res => {
      const data = res.data.concat(currentShower)
      this.calculateAverages(data)
    })
  }

  calculateAverages = (data) => {
    const length = this.calcAvg(this.getValues(data, "duration"));
    const maxT = this.calcAvg(this.getValues(data, "tempPeak"));
    const maxH = this.calcAvg(this.getValues(data, "humidityPeak"));
    const incT = this.calcAvg(this.getCalculatedValues(data, "humidityPeak", "humidityBefore"));
    const incH = this.calcAvg(this.getCalculatedValues(data, "tempPeak", "tempBefore"));

    const avgs = {
      length,
      maxT,
      maxH,
      incT,
      incH
    }
    this.setState({avgs})
  }

  getValues = (data, dataType) => {
    const values = [];
    data.forEach(shower => {if (shower[dataType]) values.push(shower[dataType])})
    return values;
  }

  getCalculatedValues = (data, dataType1, dataType2) => {
    const values = [];
    data.forEach(shower => {if (shower[dataType1] && shower[dataType2]) values.push(shower[dataType1] - shower[dataType2])})
    return values;
  }

  calcAvg = (data) => {
    const total = data.reduce((acc, cur) => acc + cur);
    return (total/data.length).toFixed(2)
  }

  calculateDuration = () => {
      let duration = Date.now() - this.state.showerStartedAt;
      this.setState({duration, durationMessage: this.prettyDuration(duration)})
  }

  prettyDuration = (duration) => {
    let durationMessage;
    const hoursDifference = Math.floor(duration/1000/60/60);
    duration -= hoursDifference*1000*60*60
    const minutesDifference = Math.floor(duration/1000/60);
    duration -= minutesDifference*1000*60
    const secondsDifference = Math.floor(duration/1000);
    durationMessage = `${minutesDifference}m ${secondsDifference}s`
    return durationMessage;
  }

  getInitialData = () => {
    this.getCurrentData();
    window.setTimeout(() => {
      this.setState({initialHumidity: this.state.currentHumidity, initialTemperature: this.state.currentTemperature})
  }, 1000);
    this.setState({timer: setInterval(() => this.checkCurrentData(), 3000)})
  }

  checkCurrentData = () => {
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
    console.log(this.prettyDuration(Math.abs(this.state.avgs.length - this.state.duration)))
    const data = {
      length: this.state.durationMessage,
      averageLength: this.prettyDuration(this.state.avgs.length),
      diffFromAverage: this.prettyDuration(Math.abs(this.state.avgs.length - this.state.duration)),
      startH: this.state.initialHumidity,
      startT: this.state.initialTemperature,
      peakH: this.state.peakHumidity,
      peakT: this.state.peakTemperature,
      avgPeakH: this.state.avgs.maxT,
      avgPeakT: this.state.avgs.maxH,
      diffH: this.state.peakHumidity - this.state.initialHumidity,
      diffT: this.state.peakTemperature - this.startShower.initialTemperature,
      avgDiffH: this.state.avgs.incH,
      avgDiffT: this.state.avgs.incT
    }
    return (
      <div className="App">
        <div className="app-title">SHWR PWR!</div>
        <div className="app-headline">keep it short!</div>
        <Button type={!this.state.showerIsOn ? 'turn-shower-on' : 'turn-shower-off' } onClick={this.toggleShower}/>
        {!this.state.showerIsOn && this.state.duration ? <Data data={data}/> : null}
        {this.state.showerIsOn ? <div className="active-timer">{this.state.timeElapsed}</div> : null}
      </div>
    )
  }
}

export default App;
