import React, { Component } from 'react';
import logo from "../logo.svg";
import './login.css';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    loginClick=() => {
        console.log(this.props);
        // let logState = {...this.props};
        // logState = logState.loginState = true;
        // console.log('kkk',logState)
        // this.props.loginState = true;
        this.props.loginFunc();
      }

    render() {
        return(
            <div className ='background'>
            <form style={{marginTop:'7rem', marginLeft: '30%'}}>
                <div className ='login-container'>
                    <input type="text" placeholder="Enter Username" name="uname"/><br></br>
                    <input type="password" placeholder="Enter Password" name="psw"/><br></br>
                    <button type="submit"  onClick={()=>this.loginClick()}>Login</button>
                </div>
            </form>
            </div>
        )
    }
}

export default Login;