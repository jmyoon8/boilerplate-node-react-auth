import React, { useEffect} from'react'
import axios from "axios"



function LandingPage(){
        useEffect(()=>{
            axios.get('http://localhost:5000/api/hello')
            .then(response=>console.log(response.data))
        },[])
    return(
        <div>
            LandingPage 랜딩페이지
        </div>
    )

}

export default LandingPage
