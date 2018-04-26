import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"

class Land extends Component {
    
    state = {  }

    render() {

        console.log(this.props)
        if(this.props.userRole){
            return <Redirect to='/dash' />
        }

        return (
            <div>
                <h2>Landing Page</h2>
                
                <Link to='/signin'>Sign In</Link><br/><br/>
                <Link to='/signup'>Sign Up</Link><br/><br/>

            </div>
        );
    }
}

export default Land;