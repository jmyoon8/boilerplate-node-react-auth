import React,{useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


function LandingPage(props) {

    useEffect(()=>{

        axios.post('/hello').then(res=>{console.log(res)})
      
    },[])

    const onclickHandler=()=>{
        axios.post('/user/logOut').then(response=>{
            console.log(response)
            if(response.data.success){
                alert("로그아웃 성공")
                props.history.push("/login")
            }else{
                alert("로그아웃 실패")
            }
        })
    }
   
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', width:'100%',height:'100vh'}}>
            LandingPage
            <button onClick={onclickHandler}>
                로그아웃                
            </button>
        </div>
    )
}

export default withRouter(LandingPage) 