import React, { Component } from 'react';
import { auth } from "../utils/base"
import { Link } from 'react-router-dom';


class Dash extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
          
        }
  
      }

    signOut = () => {
        auth()
      .signOut()
      .then(function() {
        console.log("Sign-out successful")
      })
      .catch(function(error) {
        console.log("An error happened during sign-out. Here it is: "+error.message)
      })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h2>This is Dash</h2>
                <p>You are logged in as {this.props.userRole}</p>
                <button onClick={this.signOut}>Sign Out</button><br/><br/>
                <Link to='/addagent'>Add Agent</Link>
            </div>            
        );
    }
}

export default Dash;