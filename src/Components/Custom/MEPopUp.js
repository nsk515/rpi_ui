import React, { Component } from 'react';
import '../Custom/input.css'
import '../Custom/button.css'
import './MEPopUp.css'
import close from '../icons/close.png'

class MEPopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popUpVisible : false
        }
        this.onPopUpCLick = this.onPopUpCLick.bind(this);
        this.onPopUpClose = this.onPopUpClose.bind(this);
    }

    onPopUpCLick() {
        this.setState({popUpVisible : true});
    }

    onPopUpClose() {
        this.props.onPopupClose();
        this.setState({popUpVisible : false});
    }

    render() {
        return(
            <div>
                <div onClick={this.onPopUpCLick}>
                    {this.props.trigger ? this.props.trigger : ''}
                </div>
                {this.state.popUpVisible ?
                    <div className='overlay'>
                        <div className='popUpElement'>
                        <img src={close} title='Close' alt='close' onClick={this.onPopUpClose} className='closeIcon' />
                            {this.props.popUpElement ? this.props.popUpElement : ''}
                        </div>
                    </div> : ''
                }
            </div>
        );
    }
}

export default MEPopUp;