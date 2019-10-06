import React from 'react';
import './App.css';

class Data extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        // length of shower
        // average shower time, how much longer/shorter this time
        // start, peak, delta humidity
        // start, peak, delta temp
        const {length, averageLength, diffFromAverage} = this.props.data;
        return (
            <div className="Data">
                <div className="data-row">
                    <DataPoint data={length} label="length of shower" type="large"/>
                    <DataPoint data={averageLength} label="avg shower time" type="large"/>
                    <DataPoint length={diffFromAverage} label = {`${length > averageLength ? 'Longer':'Shorter'} than average`} type="large"/>
                </div>
                {/* <div className="data-row">
                    <DataPoint data={peakT} label={} type="large"/>
                    <DataPoint data={avgPeakT} label={} type="small"/>
                    <DataPoint data={diffT} label={} type="large"/>
                    <DataPoint data={avgDiffT} label={} type="small"/>
                </div>
                <div className="data-row">
                    <DataPoint data={peakH} label={} type="large"/>
                    <DataPoint data={avgPeakH} label={} type="small"/>
                    <DataPoint data={diffH} label={} type="large"/>
                    <DataPoint data={avgDiffH} label={} type="small"/>
                </div> */}

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
                <div className="data-point-label">{label}</div>
            </div>
        )
    }
}