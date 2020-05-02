import React, { Component } from 'react';
import SideNav from './sidenav'
import './sidenav.css'

class Charts extends Component {
    constructor() {
        super();
        this.state = {
            sidebarNavList : [
                { label: "ChartsNavItem1",    link: '#chartsnav1',  active : true},
                { label: "ChartsNavItem2",    link: '#chartsnav2',  active : false},
                { label: "ChartsNavItem3",    link: '#chartsnav3',  active : false},
                { label: "ChartsNavItem4",    link: '#chartsnav4',  active : false},
                { label: "ChartsNavItem5",    link: '#chartsnav5',  active : false},
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
                    <h1 style={{paddingLeft:'30px'}}>This is Charts Page</h1>
                    {msg}
                </div>
            </div>
        )
    }
}

export default Charts;
