import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from "./contexts/userContext"

import NavbarComp from './components/navbar'

import Home from './pages/Home'
import About from './pages/About'
import Auth from './pages/Auth'
import Axios from './pages/Axios'
import ReactQuery from './pages/ReactQuery'

import { API, setAuthToken } from './config/api'

document.title = 'Batch 23'

// init token pada axios setiap kali aplikasi direfresh
if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(()=>{
    if(state.isLogin == false){
      router.push('/auth')
    }else{
      router.push('/')
    }
  },[state])

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')

      if(response.status === 404){
        return dispatch({
          type: "AUTH_ERROR"
        })
      }

      let payload = response.data.data.user
      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[])

  return (
    <>
          {state.isLogin && <NavbarComp /> }
            <Switch>
              <>
                <div className="container">
                    <Route exact path="/" component={Home} />
                    <Route  path="/about" component={About} />
                    <Route  path="/axios" component={Axios} />
                    <Route  path="/react-query" component={ReactQuery} />
                </div>
                <Route path="/auth" component={Auth} />
              </>
            </Switch>
    </>
  );
}

export default App;
