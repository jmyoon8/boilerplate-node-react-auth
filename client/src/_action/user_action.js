import axios from'axios'
import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER

}from './types'

export function loginUser(dataTosubmit){
    //액션을 통해 데이터를 가져오고 그것을 리듀서로 리턴한다.
    const request=axios.post('/user/login',dataTosubmit)
    .then(response=>response.data)
    //리듀서의 액션항목으로 넘어갈 객채를 리턴한다.
    return{
        type:LOGIN_USER,
        payload:request
    }
}
export function registerUser(dataToRegister){

    const request=axios.post('/user/register',dataToRegister)
    .then(response=>response.data)

    return{
        type:REGISTER_USER,
        payload:request
    }

}
export function auth(dataToAuth){

    const request=axios.get('/user/auth')
    .then(response=>response.data)

    return{
        type:AUTH_USER,
        payload:request
    }

}