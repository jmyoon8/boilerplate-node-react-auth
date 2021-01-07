import React,{Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//라우팅할 컴포넌트를 불러온다.
import LandingPage from './views/LandingPage/LandingPage'
import RegisterPage from'./views/RegisterPage/RegisterPage'
import LoginPage from './views/LoginPage/LoginPage'
import NavBar from './views/NavBar/NavBar' 
//Hoc를 불러온뒤 페이지 권한 체크를 해준다.(다른 컴포넌트를 감싸주면된다.)
import AUTH from'../hoc/auth'

//라우터
function App() {
  return (
    <Suspense fallback={(<div>loading..</div>)}>
      
        <Router>
        <NavBar/>
        <div style={{paddingTop:'69px',minHeight:'calc(100vh-80px)'}}>
              <Switch>
                {/* HOC-AUTH컴포넌트를 이용하려면 인증을 거처야하는 컴포넌트는 익스포트 시 withRouter()으로 감싼다(react-router-dom 라이브러리의 함수) 
                  그래야 컴포넌트안에 props.history.push()를 사용할 수있다.*/}
                <Route exact path='/' component={AUTH(LandingPage,null)}/>
                <Route exact path='/login' component={AUTH(LoginPage,false)}/>
                <Route exact path='/register' component={AUTH(RegisterPage,false)}/>
              </Switch>
        </div>
        </Router>
     
    </Suspense>
  );
}

export default App;
