import React, { useState } from 'react'
import {useDispatch} from'react-redux';
import {loginUser} from'../../../_action/user_action'
import {withRouter} from'react-router-dom';
function LoginPage(props) {

    const [Email, setEmail]=useState("");
    const [Password, setPassword]=useState("")
    
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    //리덕스.액션으로 디스패치하기위한 디스패처를 가져온다.
    const dispatch=useDispatch();

    const onsubmitHandler=(event)=>{
        //섬밋이 일어날때마다 페이지가 리프레시되는 것을 방지
        event.preventDefault();
        //state의 현재값을 가져온다.
        const loginData={
            email:Email,
            password:Password
        }
        //액션으로 디스패치하기(액션에서 액시오스를 통해 로그인을 실행한다)
        dispatch(loginUser(loginData))
        .then(response=>{
            if(response.payload.loginSuccess){
                props.history.push("/")   
            }

        })
       
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:"column"}} onSubmit={onsubmitHandler}>
                <label >Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br/>
                <button>
                    logIn
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage) 
