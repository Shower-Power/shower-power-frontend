import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      showerIsOn: false,
      currentShowerId: null,
      showerStartedAt: null,
      showerEndedAt: null,
      durationMessage: '',
    }
  }
  toggleShower = () => {
    this.state.showerIsOn ? this.startShower() : this.endShower();
    this.setState({showerIsOn: !this.state.showerIsOn});
  }

  startShower = () => {
    // set this.state.showerStartedAt to the current timestamp
    this.setState({showerStartedAt: Date.now()})
    fetch('https://shower-power.herokuapp.com/api/v1/showers',{
      method: 'POST',
      body: JSON.stringify({}),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => console.log(response))
  }

  endShower = () => {
    // calculate a duration and add to the record
    this.setState({showerEndedAt: Date.now()})
    const duration = Date.now() - this.state.showerStartedAt;
    fetch(`https://shower-power.herokuapp.com/api/v1/showers/${this.state.currentShowerId}`, {
      method: 'PATCH',
      body: JSON.stringify({duration})
    })
  }

  calculateDuration = () => {
      let duration = this.state.showerEndedAt - this.state.showerStartedAt;
     const hoursDifference = Math.floor(duration/1000/60/60);
      duration -= hoursDifference*1000*60*60
      const minutesDifference = Math.floor(duration/1000/60);
      duration -= minutesDifference*1000*60
      const secondsDifference = Math.floor(duration/1000);
      this.setState({durationMessage: `${hoursDifference} hours ${minutesDifference} minutes ${secondsDifference} seconds`})
  }

  render() {
    return (
      <div className="App">
        <Button type={this.state.showerIsOn ? 'turn-shower-on' : 'turn-shower-off' } onClick={this.toggleShower}/>
      </div>
    )
  }
}

export default App;
