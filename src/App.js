import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      showerIsOn: false
    }
  }
  toggleShower = () => {
    this.setState({showerIsOn: !this.state.showerIsOn})
    // make a call to the server to create a record
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
