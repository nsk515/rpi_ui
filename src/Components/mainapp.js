import React, { Component } from 'react';
import MeNavBar from './me_navbar'
import Home from './Home'
import Charts from './Charts'
import Configure from './Configure'

class MainApp extends Component {
    constructor() {
        super();

        this.state = {
            navlist :   [
                { label: "Home",        link: '#home',      active : true},
                { label: "Charts",      link: '#charts',    active : false},
                { label: "Configure",   link: '#configure', active : false},
            ]
        };
    }

    tabClick=(e) => {
        this.state.navlist.map((item, index) => {
            index===e ? item.active = true : item.active = false;
            return(item)
        });
        this.setState({render: true});
    }

    render() {
        return(
            <div>
                 <MeNavBar 
                    logout = {this.props.logoutFunc}
                    navlist = {this.state.navlist}
                    tabClick = {this.tabClick}
                />
                {this.state.navlist[0].active ? <Home /> : ''}
                {this.state.navlist[1].active ? <Charts /> : ''}
                {this.state.navlist[2].active ? <Configure /> : ''}
            </div>
        );
    }
}

export default MainApp