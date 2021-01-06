import{AUTH_USER, LOGIN_USER, REGISTER_USER} from'../_action/types';


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state={}, action){
    
    switch (action.type) {

        case LOGIN_USER:
            //액션에서 가져온 데이터를 state배열에 담아 리턴한다.
            return Object.assign(state, {loginSuccess : action.payload})
            
        case REGISTER_USER :
            return Object.assign(state,{registerSuccess : action.payload})    
        
        case AUTH_USER :
            return Object.assign(state, { auth : action.payload})

        default: return state;
            
    }
}