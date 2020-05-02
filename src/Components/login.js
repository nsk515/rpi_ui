import React, { Component } from 'react';
import logo from "../logoME.png";
import './login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    loginClick=() => {
        this.props.loginFunc(this.state.username, this.state.password);
      }

      onChangeUsername=(event) => {
          this.setState({username : event.target.value});
      }

      onChangePassword=(event) => {
          this.setState({password : event.target.value});
      }

    render() {
        return(
            <div className ='background'>
                <div style={{height:'75%'}}>
                    <form method='none'>
                        <div className ='login-container'>
                            <h2>Gateway Device Login</h2>
                            {this.props.loginError ? <h3>Invalid LoginID or Password</h3> : '' }
                            <input type="text" placeholder="Enter Username" onChange={this.onChangeUsername} value={this.state.username}/><br></br>
                            <input type="password" placeholder="Enter Password" onChange={this.onChangePassword} value={this.state.password}/><br></br>
                            <button type="button"  onClick={()=>this.loginClick()}>Login</button>
                        </div>
                    </form>
                </div>
                <div>
                    <img src={logo} style={{backgroundColor: 'whitesmoke', marginTop:'10px', marginLeft:'10px'}} alt='Logo'></img>
                    <p style={{color:'black', fontSize: '70%'}}>
                        MicroEmbedded Technologies, Pune
                    </p>
                </div>
            </div> 
        )
    }
}

export default Login;
