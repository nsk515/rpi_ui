import React, { Component } from 'react';
import axios from 'axios';
import METable from '../Custom/Table'
import edit_icon from '../icons/edit.png'
import delete_icon from '../icons/delete.png'
import '../Custom/button.css'
import DeviceForm from './DeviceForm'
import MEPopUp from '../Custom/MEPopUp'

const Constants = require('../../Config/Config');

class DeviceManager extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            tableData : null,
            newDeviceData : null,
            headers : ["Device ID", "MAC Address", "Device Name", "Actions"]
        }
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.onPopupClose = this.onPopupClose.bind(this);
        this.updateDeviceTable = this.updateDeviceTable.bind(this);
    }

    edit(id) {
        console.log('edit', id);
    }

    delete(id) {
        axios.delete(Constants.url+Constants.port+'/api/device/' + id)
        .then((response) => {
            if(response.status === 200) {
                let tempTableData = this.state.tableData;
                tempTableData.map((e, key) => {
                    if(e.id === id) {
                        tempTableData.splice(key, 1);
                    }
                    return e;
                });
                this.setState({tableData: tempTableData});
            }
        });
    }

    onPopupClose() {
        this.updateDeviceTable();
    }

    updateDeviceTable() {
        axios.get(Constants.url+Constants.port+'/api/device/')
        .then((response) => {
            let resp = response.data;
            resp.map((e) => {
                e.edit = (<table style={{width:'fit-content'}}><tbody><tr>
                    <td><MEPopUp
                        trigger={<img src={edit_icon} title='Edit' alt='Edit' className='actionIcons'/>}
                        popUpElement={<DeviceForm id={e.id} />}
                        onPopupClose={this.onPopupClose}
                    /></td>
                    <td><img src={delete_icon} title='Delete' alt='Delete' className='actionIcons' onClick={()=>this.delete(e.id)}/></td>
                    </tr></tbody></table>)
        return e;
            })
            this.setState({tableData: resp});
        })
        .catch((error) => {console.log('error', error)})
    }

    componentDidMount() {
        this.updateDeviceTable();
    }

    render() {
        return(
            <div>
                <MEPopUp trigger={
                            <button 
                                type="button" 
                                className='newButton' 
                                style={{left:'70%', position:'absolute'}}
                            >
                                New Device
                            </button>
                        }
                        popUpElement={<DeviceForm />}
                        onPopupClose={this.onPopupClose}
                />

                <METable 
                    title="Device Table"
                    headers={ this.state.headers }
                    data={ this.state.tableData }
                    columns="deviceid.mac.devicename.edit"
                    searchColumns={['deviceid', 'mac', 'devicename']}
                    perPageItemCount={ 10 }
                />
            </div>
        );
    }
}

export default DeviceManager;
