import React, { Component } from 'react';
import axios from 'axios';
import Widget from './Widget'
import './Grid.css'

const Constants = require('../../Config/Config');


class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices : []
        }
    }

    componentDidMount() {
        let widgettype = 0;
        if(this.props.type === "charts") {
            widgettype=2;
        }
        else if(this.props.type === "gauge") {
            widgettype=3;
        }
        axios.get(Constants.url+Constants.port+'/api/widget/'+widgettype.toString())
            .then((response) => {
                let data = response.data;
                let deviceList = [];
                data.map((e) => {
                    deviceList.push(e.id);
                    return e;
                });
                this.setState({devices: deviceList});
            })
            .catch((error) => {console.log('error', error)});
    }

    removeDevice = (id) => {
        console.log(id);

        axios.put(Constants.url+Constants.port+'/api/device/widget/' + id.toString(), {
            widgetType: 0
        })
        .catch((error) => {console.log('error', error)});

        let deviceList = this.state.devices;
        this.setState({devices: []});
        id = deviceList.indexOf(id);
        if(id >= 0) {
            deviceList.splice(id, 1);
            setTimeout(()=>{this.setState({devices: deviceList})}, 10, deviceList);
        }
    }

    render() {
        let elements = [];
        if(this.state.devices !== []) {
            this.state.devices.map((e) => {
                return(
                    elements.push(
                        <div className='grid-style'>
                            <Widget
                            id={e} 
                            onRemove={this.removeDevice}
                            />
                        </div>
                    )
                );
            });
        }
        elements.push(
            <div className='grid-style add-new' onClick={()=>{console.log("Add New")}}>
                Add New
            </div>
        )
        return(
            <div className='grid-container'>
                {elements}
            </div>
        );
    }
}

export default Grid;
