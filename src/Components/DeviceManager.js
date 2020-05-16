import React, { Component } from 'react';
import axios from 'axios';
import METable from './Table'
import edit_icon from '../edit.png'
import delete_icon from '../delete.png'

class DeviceManager extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            tableData : null,
            headers : ["Device ID", "MAC Address", "Device Name", "Actions"]
        }
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit(id) {
        console.log('edit', id);
    }

    delete(id) {
        console.log('delete', id);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/device/')
        .then((response) => {
            let resp = response.data;
            resp.map((e) => {
                e.edit = (<div>
                            <img src={edit_icon} title='Edit' alt='Edit' className='actionIcons' onClick={()=>this.edit(e.deviceid)}/>
                            <img src={delete_icon} title='Delete' alt='Delete' className='actionIcons' onClick={()=>this.delete(e.deviceid)}/>
                          </div>)
                return e;
            })
            this.setState({tableData: resp});
        })
        .catch((error) => {console.log('error', error)})
    }

    render() {
        return(
            <div>
                <METable 
                    title="Device Table"
                    headers={ this.state.headers }
                    data={ this.state.tableData }
                    columns="deviceid.mac.devicename.edit"
                    perPageItemCount={ 3 }
                />
            </div>
        );
    }
}

export default DeviceManager;
