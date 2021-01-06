//리듀서가 store안에 여러게가 있기 때문에 묶어야한다.(다른 곳에서 만든 리듀서를 임포트해서 한번에 묶어준다.)
import {combineReducers} from 'redux';
import user from './user_reducer'
const rootReducer = combineReducers({
    
    user
    
})

export default rootReducer