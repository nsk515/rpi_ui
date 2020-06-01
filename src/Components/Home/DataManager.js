import React, { Component } from 'react';
import axios from 'axios';
import METable from '../Custom/Table'
import edit_icon from '../icons/edit.png'
import delete_icon from '../icons/delete.png'
import '../Custom/button.css'
import DataForm from './DataForm'
import MEPopUp from '../Custom/MEPopUp'

const Constants = require('../../Config/Config');

class DataManager extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            tableData : null,
            newDeviceData : null,
            headers : ["Device ID", "Device Name", "Value", "Timestamp", "Actions"]
        }
        // this.edit = this.edit.bind(this);
        // this.delete = this.delete.bind(this);
        this.onPopupClose = this.onPopupClose.bind(this);
        this.updateDataTable = this.updateDataTable.bind(this);
    }

    delete(id) {
        axios.delete(Constants.url+Constants.port+'/api/data/' + id)
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

    updateDataTable() {
        axios.get(Constants.url+Constants.port+'/api/data/')
        .then((response) => {
            let resp = response.data;
            resp.map((e) => {
                e.edit = (<table style={{width:'fit-content'}}><tbody><tr>
                    <td><MEPopUp
                        trigger={<img src={edit_icon} title='Edit' alt='Edit' className='actionIcons'/>}
                        popUpElement={<DataForm id={e.id} />}
                        onPopupClose={this.onPopupClose}
                    /></td>
                    <td><img src={delete_icon} title='Delete' alt='Delete' className='actionIcons' onClick={()=>this.delete(e.id)}/></td>
                    </tr></tbody></table>)
                let tempDateTime = new Date(Number(e.timestamp));
                e.timestamp = tempDateTime.toLocaleString();
                console.log(e.timestamp);
        return e;
            })
            this.setState({tableData: resp});
        })
        .catch((error) => {console.log('error', error)})
    }

    onPopupClose() {
        this.updateDataTable();
    }

    componentDidMount() {
        this.updateDataTable();
    }

    render() {
        return(
            <div>
                <METable 
                    title="Data Table"
                    headers={ this.state.headers }
                    data={ this.state.tableData }
                    columns="deviceid.devicename.value.timestamp.edit"
                    searchColumns={['deviceid', 'devicename']}
                    perPageItemCount={ 10 }
                />
            </div>
        )
    }
}

export default DataManager;