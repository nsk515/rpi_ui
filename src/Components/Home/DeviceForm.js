import React, { Component } from 'react';
import axios from 'axios';
import '../Custom/input.css'
import '../Custom/button.css'

const Constants = require('../../Config/Config');

class DeviceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData : {
                            deviceid: '',
                            devicename: '',
                            mac: ''
                        },
            protocol : 0,
            success: false,
            msg: ''
        }
        this.onProtocolChange = this.onProtocolChange.bind(this);
        this.onClickBtn = this.onClickBtn.bind(this);
        this.onChangeDeviceID = this.onChangeDeviceID.bind(this);
        this.onChangeMacID = this.onChangeMacID.bind(this);
        this.onChangeDeviceName = this.onChangeDeviceName.bind(this);
    }

    onProtocolChange(e) {
        console.log(e.target.value);
        this.setState({protocol : e.target.value});
    }

    componentDidMount() {
        if(this.props.id) {
            axios.get(Constants.url+Constants.port+'/api/device/'+this.props.id.toString())
            .then((response) => {
                this.setState({tableData: response.data[0]});
            })
            .catch((error) => {console.log('error', error)});
        }
    }

    onClickBtn() {
        if(this.props.id) {
            axios.put(Constants.url+Constants.port+'/api/device/'+this.props.id.toString(), {
                deviceid: this.state.tableData.deviceid,
                mac: this.state.tableData.mac,
                devicename: this.state.tableData.devicename
                }
            )
            .then(() => {
                this.setState({msg: "Edited Successfully", success: true})
            })
            .catch(() => {
                this.setState({msg: "Edit Failed", success: false})
            });
        }
        else {
            axios.post(Constants.url+Constants.port+'/api/device/', {
                deviceid: this.state.tableData.deviceid,
                mac: this.state.tableData.mac,
                devicename: this.state.tableData.devicename
                }
            )
            .then(() => {
                this.setState({msg: "Added Successfully", success: true})
            })
            .catch(() => {
                this.setState({msg: "Add Failed", success: false})
            });
        }
    }

    onChangeDeviceID(e) {
        let tempTableData = this.state.tableData;
        tempTableData.deviceid = e.target.value;
        this.setState({tableData: tempTableData});
    }

    onChangeMacID(e) {
        let tempTableData = this.state.tableData;
        tempTableData.mac = e.target.value;
        this.setState({tableData: tempTableData});
    }

    onChangeDeviceName(e) {
        let tempTableData = this.state.tableData;
        tempTableData.devicename = e.target.value;
        this.setState({tableData: tempTableData});
    }

    render() {
        return(
            <div>
                <form style={{padding:'0', margin:'0', width:'fit-content', border:'none', borderRadius:'0', WebkitBoxShadow:'none', backgroundColor:'whitesmoke'}}>
                    <br/>
                    <h4 style={{fontSize:'140%', fontStyle:'bold', margin:'15px', color:'#3283e0ff'}}>
                        {this.props.id ? 'Edit Device' : 'Register New Device'}
                    </h4><br/>
                    <input placeholder='Device ID' value={this.state.tableData?this.state.tableData.deviceid:''} onChange={this.onChangeDeviceID}/>
                    <input placeholder='MAC address (aa:bb:cc:dd:ee:ff)' value={this.state.tableData?this.state.tableData.mac:''} onChange={this.onChangeMacID}/><br/>
                    <input placeholder='Device Name' value={this.state.tableData?this.state.tableData.devicename:''} onChange={this.onChangeDeviceName}/>
                    <select value={this.state.protocol} onChange={this.onProtocolChange}>
                        <option value={0} disabled>Protocol</option>
                        <option value={1}>HTTP</option>
                        <option value={2}>MQTT</option>
                        <option value={3}>XBEE</option>
                    </select> <br/>
                    <button type='button' style={{marginLeft:'30%', width:'200px', marginRight:'10px'}} onClick={this.onClickBtn}>
                    {this.props.id ? 'Save' : 'Add'}
                    </button>
                    {this.state.msg ? <label style={{fontSize:'80%', color:this.state.success?'green':'red'}}>{this.state.msg}</label> : ''}
                </form>
            </div>
        );
    }
}

export default DeviceForm;