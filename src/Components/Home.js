import React, { Component } from 'react';
import SideNav from './sidenav'
import './sidenav.css'
import './Home.css'
import { TablePagination } from 'react-pagination-table';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            sidebarNavList : [
                { label: "Favorites",       link: '#homenav1',  active : true},
                { label: "Devices",         link: '#homenav2',  active : false},
                { label: "Data",            link: '#homenav3',  active : false},
                { label: "Rules",           link: '#homenav4',  active : false},
                { label: "HomeNavItem5",    link: '#homenav5',  active : false},
            ],
            activeTab : 0,
            prevActiveTab : 0,
            tableData : null
        }
    }

    sideTabClick=(e) => {
        this.state.sidebarNavList.map((item, index) => {
            index===e ? item.active = true : item.active = false;
            return(item)
        });
        this.state.prevActiveTab = this.state.activeTab;
        this.setState({
            activeTab : e,
            render: true
        });
    }

    componentDidUpdate() {
        console.log('Component Did Update'); 
        if(this.state.prevActiveTab !== this.state.activeTab) {
            var msg = '';
            switch(this.state.activeTab) {
                case 0 : msg = (<h2>Selected Nav Item 1</h2>);
                        break;
                case 1 :console.log('case 1'); 
                        axios.get('http://localhost:4000/api/device/')
                            .then((response) => {this.setState({tableData: response.data});})
                            .catch((error) => {console.log('error', error)})
                        break;
                case 2 : msg = (<h2>Selected Nav Item 3</h2>);
                        break;
                case 3 : msg = (<h2>Selected Nav Item 4</h2>);
                        break;
                default: msg = (<h2>Selected Nav Item default</h2>);
                        break;
            }
            this.state.prevActiveTab = this.state.activeTab;
        }
    }

    render() {
        console.log('render');
        let msg = '';
        let headers = [];
        switch(this.state.activeTab) {
            case 0 : msg = (<h2>Selected Nav Item 1</h2>);
                    break;
            case 1 : headers = ["deviceID", "MAC", "Device Name"]
                    break;
            case 2 : msg = (<h2>Selected Nav Item 3</h2>);
                    break;
            case 3 : msg = (<h2>Selected Nav Item 4</h2>);
                    break;
            default: msg = (<h2>Selected Nav Item default</h2>);
                    break;
        }

        return(
            <div className='row'>
                <SideNav navlist={this.state.sidebarNavList} sideTabClick={this.sideTabClick}/>
                <div className='column column-page'>
                    <h1 style={{paddingLeft:'50px'}}>This is Home Page</h1>
                    {this.state.tableData ?  
                        <TablePagination
                            title="TablePagination"
                            subTitle="Sub Title"
                            headers={ headers }
                            data={ this.state.tableData }
                            columns="deviceid.mac.devicename"
                            perPageItemCount={ 5 }
                            totalCount={ this.state.tableData?this.state.tableData.label:0 }
                            arrayOption={ [["size", 'all', ' ']] }
                            className="deviceTable"
                        /> : ''}
                    {msg}
                </div>
            </div>
        )
    }
}

export default Home;
