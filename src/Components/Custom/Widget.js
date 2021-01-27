import React, { Component } from 'react';
import './Widget.css'
import MEChart from './Chart'
import MEGauge from './Gauge'
import axios from 'axios';
import edit_icon from '../icons/edit-white.png'
import star_outline from '../icons/star-outline.png'
import star_filled from '../icons/star-filled.png'

const Constants = require('../../Config/Config');

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceData: ''
        }
    }

    componentDidMount() {
        if(this.props.id) {
            axios.get(Constants.url+Constants.port+'/api/device/' + this.props.id.toString())
                .then((response) => {
                    this.setState({deviceData: response.data[0]});
                })
                .catch((error) => {console.log('error', error)});
        }
    }

    onFav = () => {
        axios.put(Constants.url+Constants.port+'/api/device/fav/' + this.props.id.toString(), {
            favflag: !this.state.deviceData.favorite
        })
        .then((response) => {
            let tempData = this.state.deviceData;
            tempData.favorite = !tempData.favorite;
            this.setState({deviceData: tempData});
        })
        .catch((error) => {console.log('error', error)});
        
        setTimeout(()=>{ console.log('OnFav', this.props.id, this.state.deviceData.favorite);},500);
    }

    onRemove = () => {
        this.props.onRemove(this.props.id);
    }

    render() {
        let widgetBody='';
        if(this.state.deviceData && this.state.deviceData.widget === 2) {
            widgetBody=(<MEChart id={this.state.deviceData.deviceid} />);
        }
        else if(this.state.deviceData && this.state.deviceData.widget === 3) {
            widgetBody=(<MEGauge id={this.state.deviceData.deviceid} />);
        }
        return(
            <div className='widget-container'>
                <div className='widget-header'>
                    <div style={{float:'left'}}>
                        {this.state.deviceData.devicename}
                    </div>
                    <div style={{float: 'left', right:'10px', position: 'absolute'}}>
                        {this.state.deviceData && this.state.deviceData.favorite ?
                            <img src={star_filled} alt={"Star Filled"} className='actionIcons' onClick={this.onFav} /> :
                            <img src={star_outline} alt={"Star Outline"} className='actionIcons' onClick={this.onFav} />}
                        <img src={edit_icon}  title='Edit' alt='Edit' className='actionIcons' />
                        <span title='Remove' style={{cursor: 'pointer', fontWeight: 'bolder', fontSize: '125%'}} onClick={this.onRemove}>&times;</span>
                    </div>
                </div>
                <div className='widget-body'>
                    {widgetBody}
                </div>
            </div>
        );
    }
}

export default Widget;
