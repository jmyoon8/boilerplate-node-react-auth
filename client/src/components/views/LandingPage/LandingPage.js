import React from 'react'
import {FaCode} from 'react-icons/fa'
import { withRouter } from 'react-router-dom'


function LandingPage(props) {

    return (
        <div className="app">
            <FaCode style={{fontSize:'4rem'}}></FaCode><br></br>
            <span style={{fontSize:'2rem'}}>Let's Start Coding!</span>
         </div>
    )
}

export default withRouter(LandingPage) 