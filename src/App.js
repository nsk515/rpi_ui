import React, {Component} from 'react';
import './App.css';
import MainApp from './Components/mainapp'
import Login from './Components/login'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginStatus : false,
      loginError: false
    }
  }

  signIn = (username, pwd) => {
    // if(username === "admin" && pwd === "admin") {
    if(true) {
      this.setState({
        loginStatus: true,
        loginError: false
      });
    }
    else {
      this.setState({
        loginStatus: false,
        loginError: true
      })
    }
  }

  signOut = () => {
    this.setState({
      loginStatus: false
    });
  }
  

  render() {
    return (
      <div className="App">
        {/* <div className="container"> */}
          {this.state.loginStatus ? 
          <MainApp 
            logoutFunc ={this.signOut}
          /> : 
          <Login 
            loginState={this.state.loginStatus}
            loginError={this.state.loginError}
            loginFunc ={this.signIn}
          />}
        {/* </div> */}
      </div>
    );
  }
}

export default App;
