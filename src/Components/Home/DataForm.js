import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios';
import '../Custom/input.css'
import '../Custom/button.css'

const Constants = require('../../Config/Config');

class DataForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData : {
                            deviceid: '',
                            devicename: '',
                            value: 0,
                            timestamp: 0
                        },
            success: false,
            msg: ''
        }
        this.onClickBtn = this.onClickBtn.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeTimestamp = this.onChangeTimestamp.bind(this);
    }

    componentDidMount() {
        if(this.props.id) {
            axios.get(Constants.url+Constants.port+'/api/data/'+this.props.id.toString())
            .then((response) => {
                response.data[0].timestamp = Number(response.data[0].timestamp);
                this.setState({tableData: response.data[0]});
            })
            .catch((error) => {console.log('error', error)});
        }
    }

    onClickBtn() {
        if(this.props.id) {
            axios.put(Constants.url+Constants.port+'/api/data/'+this.props.id.toString(), {
                deviceid: this.state.tableData.deviceid,
                value: this.state.tableData.value,
                timestamp: this.state.tableData.timestamp
                }
            )
            .then(() => {
                this.setState({msg: "Edited Successfully", success: true})
            })
            .catch(() => {
                this.setState({msg: "Edit Failed", success: false})
            });
        }
    }

    onChangeValue(e) {
        let tempTableData = this.state.tableData;
        tempTableData.value = e.target.value;
        this.setState({tableData: tempTableData});
    }

    onChangeTimestamp(e) {
        let tempTableData = this.state.tableData;
        tempTableData.timestamp = e.getTime();
        this.setState({tableData: tempTableData});
    }

    render() {
        let nowtime = new Date(this.state.tableData.timestamp);
        return(
            <div>
                <form style={{padding:'0', margin:'0', width:'fit-content', border:'none', borderRadius:'0', WebkitBoxShadow:'none', backgroundColor:'whitesmoke'}}>
                    <br/>
                    <h4 style={{fontSize:'140%', fontStyle:'bold', margin:'15px', color:'#0d85ddff'}}>
                        {this.props.id ? 'Edit Data' : 'Register New Data'}
                    </h4><br/>
                    <input readOnly="readonly" placeholder='Device ID' value={this.state.tableData?this.state.tableData.deviceid:''} />
                    <input readOnly="readonly" placeholder='Device Name' value={this.state.tableData?this.state.tableData.devicename:''} /> <br/>
                    <input placeholder='Value' value={this.state.tableData?this.state.tableData.value:''} onChange={this.onChangeValue} />
                    <DateTimePicker
                        clockClassName='dateTimePicker' 
                        value={nowtime}
                        format='dd-MM-y H:mm:ss'
                        maxDetail="second"
                        minDetail="year"
                        clearIcon={null}
                        calendarIcon={null}
                        onChange={this.onChangeTimestamp}
                    /> <br/>
                    <button type='button' style={{marginLeft:'30%', width:'200px', marginRight:'10px'}} onClick={this.onClickBtn}>
                    {this.props.id ? 'Save' : 'Add'}
                    </button>
                    {this.state.msg ? <label style={{fontSize:'80%', color:this.state.success?'green':'red'}}>{this.state.msg}</label> : ''}
                </form>
            </div>
        );
    }
}

export default DataForm;