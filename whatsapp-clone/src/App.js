import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox/Chatbox';
import Sidebar from './components/Sidebar/Sidebar';
import {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import axios from './axios'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from './components/Login/Login';
import {useStateValue} from './StateProvider'

function App() {

    const [{user},dispatch] = useStateValue();

    const [messages, setMessages] = useState([])

    //const [user,setUser] = useState(null)

  useEffect(() => {
     axios.get('/messages/sync')
    .then(res => {
      setMessages(res.data)})
      console.log(messages)
  }, [])

  useEffect(() => {
    /*YOUR PUSHER CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
  },[messages])

  
  return (
    <div className="app">
      {!user ? (
            <Login />
          ) : (
      <div className = 'app-body'>
            <Router>
          <Switch>
            <Route path='/rooms/:Id' exact>
            <Sidebar />
            <Chatbox />
            </Route>
          <Route path='/' exact>
          <Sidebar />
            </Route>
          </Switch>
          </Router>
      </div>
          )}
      </div>
  );
}

export default App;
