import React, { Component } from 'react';
import logo from "../logoME.png"
import './me_navbar.css'


class MeNavBar extends Component {
    // eslint-disable-next-line
    constructor() {
        super();
    }

    render() {

        let navItems = this.props.navlist.map((item, index) => {
            return(
                item.active ?   <li key={index} className="active"><a href={item.link}>{item.label}</a></li> : 
                                <li key={index}><a href={item.link} onClick={()=>this.props.tabClick(index)}>{item.label}</a></li>
            )
        })
        return(
            <nav className="menu">
                <div>
                    <ul>
                        <li><img src={logo} alt="logo" className="logo"></img></li>
                        <li><a href='./#'> </a></li>
                        {navItems}
                        <li style={{float:'right'}}><a href='#logout' onClick={()=>this.props.logout()}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MeNavBar;