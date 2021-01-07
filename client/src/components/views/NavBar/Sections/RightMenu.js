import React, { useEffect, useState } from 'react'
import {Menu} from 'antd'
import axios from'axios'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../../../../_action/user_action'


function  RightMenu(props) {
    const [userIsLogIn, setUserIsLogIn]=useState("")
   
    
    const dispatch=useDispatch()
    dispatch(auth()).then( result=>setUserIsLogIn(result.payload.isAuth))
    
   

    // useEffect(()=>{
       
    //    axios.get('/user/auth').then(result=>setUserIsLogIn(result.data.isAuth))
    
    
    // },[])

    
    const logoutHandler=()=>{
        console.log("ddd")
        axios.get('/user/logOut').then(response=>{
            
            if(response.status===200){
                
                props.history.push("/login")

            }else{
                alert("로그아웃 실패했습니다.")
            }
        })
    }
    console.log("로그인됨??",userIsLogIn)
    
    if (userIsLogIn==false) {
      
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="mail">
              <a href="/login">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/register">Signup</a>
            </Menu.Item>
          </Menu>
        )
    }
    if(userIsLogIn==true){
        console.log(userIsLogIn)
        return (
          <Menu mode={props.mode}>
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Logout</a>
            </Menu.Item>
          </Menu>
        )
    }
}
export default withRouter(RightMenu)