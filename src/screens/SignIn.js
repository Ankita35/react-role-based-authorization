import React, { Component } from "react"
import {
  Header,
  Container,
  Button,
  Icon,
  Dimmer,
  Loader,
  Menu,
  Divider,
  Input
} from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import { auth } from "../utils/base"

class SignIn extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: "",
      warning: ""
    }
  }

  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  handleInputChange = (event) => {
    const target = event.target
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  signIn = () => {
    this.setState({warning: ""})
    if(this.validateEmail(this.state.email)){
      
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        return `${errorCode} ${errorMessage}`
        // ...
      })

    } else {
      this.setState({warning: "enter a valid email"})
    }
  }

  forgotPassword = () => {
    this.setState({warning2:""})
    if(this.validateEmail(this.state.email)){

        this.setState({
            email:"",
            sent: true,
            warning3: "Passsword reset email has been sent to the above email id if it is registered with us"
          })

      return auth().sendPasswordResetEmail(this.state.email)

    } else {
        this.setState({
            warning2: "Please enter a valid email id"
        })
    }
  }

  render() {
    // You can send loading and loggedIn props from App to render spinner
    const loading = this.props.userStatus && this.props.userStatus.loading || false
    const loggedIn = this.props.userStatus && this.props.userStatus.loggedIn || false

    if(this.props.userRole){
      return <Redirect to="/"/>
    }

    return (
      <div className="App">
        <Container>
          <Menu secondary>
            <Menu.Item>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Menu.Item>
          </Menu>
        </Container>
        <Container className="App">
          <Header as="h1">Sign In</Header>
          <h4>Sign In with Username &amp; Password</h4>
          <Input name='email' value={this.state.email} onChange={this.handleInputChange} placeholder="Username/Email" />
          <br />
          <br />
          <Input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
          <br />
          <br />
          <p style={{ color: "red" }}>{this.state.warning}</p>
          <Button primary onClick={this.signIn}>
            Sign In
          </Button>
          <br/>
          <br/>
          <p onClick={this.forgotPassword}>
          Forgot password?
          </p>
          <p style={{ color: "red" }}>{this.state.warning2}</p>
          <p style={{ color: "green" }}>{this.state.warning3}</p>
        </Container>
        <Dimmer active={loading}>
          <Loader indeterminate>Searching for user...</Loader>
        </Dimmer>
        {loggedIn && <Redirect to="/" />}
      </div>
    )
  }

}

export default SignIn