import React, { Component } from 'react';
import LineChart from 'react-linechart';
import * as d3 from 'd3'
import axios from 'axios';
import '../../../node_modules/react-linechart/dist/styles.css';
import './Chart.css'

const Constants = require('../../Config/Config');


class MEChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount() {
        console.log('Chart: ', this.props.id);
        if(this.props.id) {
            axios.get(Constants.url+Constants.port+'/api/device/data/' + this.props.id)
                .then((response) => {
                    console.log('response', response.data);
                    this.setState({data: response.data});
                })
                .catch((error) => {console.log('error', error)});
        }
    }

    onPointHover=(obj)=> {
        let timeparser = d3.timeParse("%d-%m-%Y %H-%M-%S");
        let timeformater = d3.timeFormat("%H:%M");
        let time = timeformater(new Date(timeparser(obj.x)));
        let value = obj.y;
        return(
            "value: " + value + "<br /> time: " + time
        )
    }
    

    // Data format must be as follows
    // points: [{x: format(new Date(1591331400000)), y: 2}, {x: format(new Date(1591333200000)), y: 5}, {x: format(new Date(1591334400000)), y: 3},
    //          {x: format(new Date(1591335000000)), y: 1}, {x: format(new Date(1591338000000)), y: 4}, {x: format(new Date(1591342200000)), y: 0}] 
    render() {
        var format = d3.timeFormat('%d-%m-%Y %H-%M-%S');
        let data = [];
        let points = [];
        let min = 0;
        let max = 0;
        let range = 0;
        if(this.state.data && this.state.data.length>0) {
            min = max = this.state.data[0].value;
            this.state.data.map((e)=>{
                points.push({x: format(new Date(Number(e.timestamp))), y: e.value});
                if(min > e.value) {
                    min = e.value;
                }
                if(max < e.value) {
                    max = e.value;
                }
                return e;
            });
            range = max-min;
            data.push(
                {
                    color: '#0d85dd',
                    points: points
                }
            );
        }
        
        return(
            <div style={{width:'99%', height:'99%'}}>
            {this.state.data && this.state.data.length>0 ?
                <LineChart 
                    data={data} 
                    yMin={Number(min-(range/10))}
                    yMax={Number(max+(range/10))}
                    width={340} 
                    height={200} 
                    id={this.props.id}
                    hideXLabel={true}
                    yLabel={''}
                    onPointHover={this.onPointHover}
                    margins={{top: 10, right: 20, bottom: 25, left: 55}}
                    isDate={true}
                    xParser={d3.timeParse("%d-%m-%Y %H-%M-%S")}
                    xDisplay={d3.timeFormat("%H:%M")}
                    ticks={2}
                    interpolate="linear"
                    pointRadius={2}
                /> : 'No Data Available'}
            </div>            
        );
    }
}

export default MEChart;
