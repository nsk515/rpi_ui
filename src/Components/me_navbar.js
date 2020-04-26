import React, { Component } from 'react';
import logo from "../logo.svg"
import './me_navbar.css'


class MeNavBar extends Component {
    constructor() {
        super();

        this.state = {
            navlist :   [
                { label: "Home", link: '#home', active : true},
                { label: "Charts", link: '#charts', active : false},
                { label: "Configure", link: '#configure', active : false},
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

    logOut = () => {
        this.props.logoutFunc();
    }

    render() {

        let navItems = this.state.navlist.map((item, index) => {
            return(
                item.active ?   <li key={index} className="active"><a href={item.link}>{item.label}</a></li> : 
                                <li key={index}><a href={item.link} onClick={()=>this.tabClick(index)}>{item.label}</a></li>
            )
        })
        return(
            <nav className="menu">
                <div>
                    <ul>
                        <li><img src={logo} alt="logo" className="logo"></img></li>
                        <li><a href='./#'> </a></li>
                        {navItems}
                        <li style={{float:'right'}}><a href='#logout' onClick={()=>this.logOut()}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MeNavBar;