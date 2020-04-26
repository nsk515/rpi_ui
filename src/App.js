import React, {Component} from 'react';
import './App.css';
import MeNavBar from './Components/me_navbar'
import Login from './Components/login'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginStatus : false
    }
  }

  signIn = (username, pwd) => {
    this.setState({
      loginStatus: true
    })
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
          <MeNavBar 
            logoutFunc ={this.signOut}
          /> : 
          <Login 
            loginState={this.state.loginStatus}
            loginFunc ={this.signIn}
          />}
        {/* </div> */}
      </div>
    );
  }
}

export default App;
