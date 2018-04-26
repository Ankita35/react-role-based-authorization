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
  Input,
  Select
} from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom"
import { auth, ref } from "../utils/base"

class SignUp extends Component {
    constructor(props) {
      super(props)
  
      this.state={
        email: "",
        password: "",
        selection: "",
        warning: ""
      }
  
    }
  
    validateEmail = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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

    handleSelect = (event, {value})  => {
        console.log(value)
        this.setState({selection: value})
    }
  
    loginEmail = () => {
      this.setState({warning: ""})
      if(this.validateEmail(this.state.email) && this.state.selection){
        
        auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user=>this.saveUser(user, this.state.selection))
      .catch(error => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(`${errorCode} ${errorMessage}`)
      })

      } else {
        this.setState({warning: "enter a valid email/make sure you have selected a role"})
      }
      
    }

    saveUser = (user, role) => {
            return ref
              .child(`roles/${user.uid}`)
              .set({
                email: user.email,
                uid: user.uid,
                role: role
              })
              .then(() => console.log("success in adding user"))
          }
    
    render() {
      const loading = this.props.userStatus && this.props.userStatus.loading || false
      const loggedIn = this.props.userStatus && this.props.userStatus.loggedIn || false

      const options = [
        { key: 'sa', text: 'SuperAdmin', value: 'SuperAdmin' },
        { key: 'sm', text: 'StoreManager', value: 'StoreManager' },
        { key: 'fa', text: 'FieldAgent', value: 'FieldAgent' }
      ]

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
            <Header as="h1">Register Yourself</Header>
            <h4>Sign Up with Email &amp; Password</h4>
            <Input name='email' value={this.state.email} onChange={this.handleInputChange} placeholder='Email'/>
            <br/><br/>
            <Input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder='Password'/>
            <br/><br/>
            <Select options={options} value={this.state.selection} placeholder='Select a role' onChange={this.handleSelect} />
            <br/><br/>
            <p>{this.state.warning}</p>
            <Button primary onClick={this.loginEmail}>Sign Up</Button>
          </Container>
          <Dimmer active={loading}>
            <Loader indeterminate>Searching for user...</Loader>
          </Dimmer>
          {loggedIn && <Redirect to="/"></Redirect>}
        </div>
      )
    }
  }
  
  export default SignUp