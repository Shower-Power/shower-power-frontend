import React from 'react';
import './App.css';

class Data extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        const {length, averageLength, diffFromAverage, peakT, avgPeakT, diffT, avgDiffT, peakH, avgPeakH, diffH, avgDiffH} = this.props.data;
        return (
            <div className="Data">
                <div className="data-row">
                <div className="data-point-spacer"/>
                    <DataPoint data={averageLength} label="average shower time" type="large"/>
                    <DataPoint data={length} label="length of shower" type="x-large"/>
                    <DataPoint data={diffFromAverage} label = {`${length < averageLength ? 'Longer':'Shorter'} than average`} type="large"/>
                    <div className="data-point-spacer"/>
                </div>
                <div className="data-row">
                    <div className="data-point-spacer"/>
                    <div className="data-point-spacer"/>
                    <DataPoint data={typeof peakT === 'number' ? peakT.toFixed(2) : peakT} label="Peak Temp" type="small"/>
                    <DataPoint data={typeof diffT === 'number' ? diffT.toFixed(2): diffT} label="Temp Increase" type="small"/>
                    <div className="data-point-spacer"/>
                    <div className="data-point-spacer"/>
                </div>
                <div className="data-row">
                <div className="data-point-spacer"/>
                <div className="data-point-spacer"/>
                    <DataPoint data={typeof peakH === 'number' ? peakH.toFixed(2) : peakH} label="Peak Humidity" type="small"/>
                    <DataPoint data={typeof diffH === 'number' ? diffH.toFixed(2) : diffH} label="Humidity Increase" type="small"/>
                    <div className="data-point-spacer"/>
                    <div className="data-point-spacer"/>
                </div>

            </div>
        );
    }
}

export default Data;

class DataPoint extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {data, label, type} = this.props;
        return(
            <div className="data-point">
                <div className={`data-point-${type}`}>{data}</div>
                <div className={`data-point-label-${type}`}>{label}</div>
            </div>
        )
    }
}