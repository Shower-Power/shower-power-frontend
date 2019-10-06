import React from 'react';
import './App.css';

class Data extends React.Component {
    render(){
        // length of shower
        // average shower time, how much longer/shorter this time
        // start, peak, delta humidity
        // start, peak, delta temp
        return (
            <div className="Data">
                <div className="data-row">
                    <div className="data-point">
                        <div className="data-point-large">{this.state.length}</div>
                        <div className="data-point-label">Length of shower</div>
                    </div>
                    <div className="data-point">
                        <div className="data-point-large">{this.state.diffFromAverage}</div>
                        <div className="data-point-label">{`${length > averageLength ? 'Longer':'Shorter'} than average`}</div>
                    </div>
                </div>
                <div className="data-row"></div>
                <div className="data-row"></div>
                <div className="data-row"></div>
                <div className="data-row"></div>
                <div className="data-row"></div>
            </div>
        );
    }
}

export default Data;
