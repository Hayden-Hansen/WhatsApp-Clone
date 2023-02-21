import React from 'react';
import './Login.css'
import {Button} from '@material-ui/core'
import {auth,provider} from '../../firebase'
import { actionTypes } from '../../Reducer';
import {useStateValue} from '../../StateProvider'

const Login = () => {
  const [{},dispatch] = useStateValue()

  const signInHandler = () => {
    auth
    .signInWithPopup(provider)
    .then((result) => dispatch({
      type: actionTypes.SET_USER,
      user: result.user
    }))
    .catch((error) => alert(error.message))
  }

  return (
    <div className='login'>
        <div className='login-container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png' alt=''/>

            <div className='login-text'>
                <h1>Welcome to WhatsApp!</h1>
            </div>

            <Button onClick={signInHandler}>
                Sign in with google
            </Button>
        </div>
    </div>
  )
}

export default Login
