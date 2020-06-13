import React, { Component } from 'react';
import SideNav from '../sidenav'
import '../sidenav.css'
import Grid from '../Custom/Grid'
import MEChart from '../Custom/Chart'

class Widgets extends Component {
    constructor() {
        super();
        this.state = {
            sidebarNavList : [
                { label: "Charts",    link: '#charts',  active : true},
                { label: "WidgetsNavItem2",    link: '#widgetsnav2',  active : false},
                { label: "WidgetsNavItem3",    link: '#widgetsnav3',  active : false},
                { label: "WidgetsNavItem4",    link: '#widgetsnav4',  active : false},
                { label: "WidgetsNavItem5",    link: '#widgetsnav5',  active : false},
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
            case 0 : msg = (<Grid type="charts"/>);
                    break;
            case 1 : msg = (<MEChart id={'ME01001573'} />);
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
                    {/* <h1 style={{paddingLeft:'30px'}}>This is Charts Page</h1> */}
                    {msg}
                </div>
            </div>
        )
    }
}

export default Widgets;
