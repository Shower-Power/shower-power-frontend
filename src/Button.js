import React from 'react';
import './App.css';

class Button extends React.Component {
    render(){
        const buttonText = this.props.type === 'turn-shower-on' ? "Shower On" : "Shower Off"
        return (
            <div className={`Button ${this.props.type}`} onClick={this.props.onClick}>
                {buttonText}
            </div>
        );
    }
}

export default Button;
