import React, { Component } from 'react';
import './sidenav.css'

class SideNav extends Component {

    render() {

        let navItems = this.props.navlist.map((item, index) => {
            return(
                item.active ?   <li key={index}><a className='active' href={item.link}>{item.label}</a></li> : 
                                <li key={index}><a href={item.link} onClick={()=>this.props.sideTabClick(index)}>{item.label}</a></li>
            )
        })
        return(
            <div  className='column column-sidebar'>
                <div>
                    <ul>
                        {navItems}
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideNav;
