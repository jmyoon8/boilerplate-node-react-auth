import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "../_action/user_action";




// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute=null){
    //specificComponent는 HOC가 app.js에서 감싼 인증처리해야되는 콤포넌트
    
    //option 
    //null:아무나 출입가능
    //true:로그인한 유저만 출입가능
    //false:로그인한 유저는 출입 불가능한 페이지
    //라는 옵션이있다.

    //adminRoute
    //admin만 들어갈수 있는 페이지일경우 TRUE
    function AuthenticationCheck(props){
        
        const dispatch=useDispatch();
        
        useEffect(()=>{

            dispatch(auth()).then(response=>{
                // console.log(response)
                //로그인안한 상태
                
                if(!response.payload.isAuth){

                    //로그인안한 상태에애서 option이 true(로그인한 사람만 출입가능)인 페이지에 들어가려할 경우
                    if(option){
                        alert("로그인이 필요한 페이지입니다.")
                        props.history.push('/login')

                    }

                }else{
                    //로그인한 상태에서 에드민만 들어갈수 있는 페이지 일때 에드민일 경우와 아닐경우
                    if(adminRoute && !response.payload.isAdmin){
                            //로그인한 상태에서 에드민만 들어 갈 수있는 페이지 일때 에드민이 아닐경우
                            alert("관리자만 접근 가능한 페이지 입니다.")
                            props.history.push('/')

                    }else{
                        //로그인한 상태에서 들어가면 안되는 페이지로 접근하려고할 경우 (로그인페이지, 회원가입 페이지)
                        if(option===false)
                        alert("로그아웃한 뒤 접근해 주세요")
                        props.history.push('/')
                        
                    }
                }
            })
        // eslint-disable-next-line
        },[])
        
        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}