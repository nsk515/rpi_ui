import React, { Component } from 'react';
import SideNav from './sidenav'
import './sidenav.css'

class Configure extends Component {
    constructor() {
        super();
        this.state = {
            sidebarNavList : [
                { label: "ConfigNavItem1",    link: '#confignav1',  active : true},
                { label: "ConfigNavItem2",    link: '#confignav2',  active : false},
                { label: "ConfigNavItem3",    link: '#confignav3',  active : false},
                { label: "ConfigNavItem4",    link: '#confignav4',  active : false},
                { label: "ConfigNavItem5",    link: '#confignav5',  active : false},
            ],
            actveTab : 0
        }
    }

    sideTabClick=(e) => {
        this.state.sidebarNavList.map((item, index) => {
            index===e ? item.active = true : item.active = false;
            return(item)
        });
        this.setState({
            actveTab : e,
            render: true
        });
    }

    render() {
        
        let msg = '';
        switch(this.state.actveTab) {
            case 0 : msg = (<h2>Selected Nav Item 1</h2>);
                    break;
            case 1 : msg = (<h2>Selected Nav Item 2</h2>);
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
                    <h1 style={{paddingLeft:'30px'}}>This is Config Page</h1>
                    {msg}
                </div>
            </div>
        )
    }
}

export default Configure;