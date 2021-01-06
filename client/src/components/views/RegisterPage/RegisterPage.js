import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_action/user_action';

function RegisterPage(props) {
    
    const [Email, setEmail]=useState("");
    const [Password, setPassword]=useState("")
    const [ConfirmPassword,setConfirmPassword]=useState("")
    const [Name, setName]=useState("")
    

    
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler=(event)=>{
        setConfirmPassword(event.currentTarget.value)
    }
    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }

    //리덕스.액션으로 디스패치하기위한 디스패처를 가져온다.
    const dispatch=useDispatch();

    const onsubmitHandler=(event)=>{
        event.preventDefault();

        if(Password!==ConfirmPassword){
            return alert("비밀번호가 틀립니다.")
        }
        //섬밋이 일어날때마다 페이지가 리프레시되는 것을 방지
        event.preventDefault();
        //state의 현재값을 가져온다.
        const registerData={
            email:Email,
            password:Password,
            name:Name

        }
        //액션으로 디스패치하기(액션에서 액시오스를 통해 로그인을 실행한다)
        dispatch(registerUser(registerData))
        .then(response=>{
            if(response.payload.success){
                alert("회원가입완료!")
                props.history.push("/")   
            }else{
                alert("회원가입 실패")
            }

        })
       
    }

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%',height:'100vh'}}>
            <form style={{display:'flex', flexDirection:"column"}} onSubmit={onsubmitHandler}>
                
                <label >Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                
                <label>ConfirmPassowrd</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                
                <br/>
                <button>
                    SignUp
                </button>


            </form>
        </div>
    )
}

export default withRouter(RegisterPage) 
