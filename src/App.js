import React, { Component } from 'react';
import './App.css';
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Land from "./screens/Land";
import Dash from "./screens/Dash";
import AddAgent from "./screens/AddAgent"
import { Link, Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import { auth, base } from "./utils/base"

// Authorization HOC
const Authorization = (WrappedComponent, allowedRoles, user, userRole) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
        
      }

    }

    render() {
      const role = userRole
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} user={user} userRole={userRole} />
      } else {
        return <Redirect to="/dash" />
      }
    }
  }
}

class App extends Component {
  state = {
    user: {},
    userRole: '',
    loggedIn: false,
    loading: true
  }

  componentDidMount() {
    //this.setState({loading: true})
    auth().onAuthStateChanged(user => {
      //this.setState({ loading: false })
      if (user) {
        console.log("User logged in")
        this.setState({
          loggedIn: true,
          user: user
        })
        console.log(user)

        base
          .fetch(`roles/${user.uid}`, {
            context: this
          })
          .then(data => {
            if (data.uid) {
              this.setState({
                userRole: data.role,
                loading: false
              })
            } else {
              this.setState({
                userRole: '',
                loading: false
              })
            }
          })
          .catch(err => console.log(err))
      } else {
        console.log("User not logged in, redirect to Sign In")
        this.setState({
          loggedIn: false,
          user: {},
          userRole: '',
          loading: false
        })
        if(!(window.location.pathname === "/")){
          window.location = "/"
        }
      }
    })
  }

  render() {
    const user = this.state.user
    const userRole = this.state.userRole

    const ManagerRole = ['SuperAdmin',  'StoreManager']

    return (
        <Router>
      <div className="App">

          <Route path="/" exact render={(routeProps) => (
            <Land {...routeProps} user={user} userRole={userRole} />
          )}/>
          
          <Route path="/dash" component={Authorization(Dash, ['SuperAdmin', 'StoreManager', 'FieldAgent', 'admin'], user, userRole)}/>
          <Route path="/addagent" component={Authorization(AddAgent, ManagerRole, user, userRole)}/>

          <Route path="/signup" render={(routeProps) => (
            <SignUp {...routeProps} user={user} userRole={userRole} />
          )}/>
          
          <Route path="/signin" render={(routeProps) => (
            <SignIn {...routeProps} user={user} userRole={userRole} />
          )}/>

      </div>
        </Router>
    );
  }
}

export default App;
