import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';
import axios from '../../axios'
import {Link} from 'react-router-dom'
import Pusher from 'pusher-js';


const SidebarChat = ({id,name,addNewChat}) => {

  const [base,setBase] = useState('')

  const [messages, setMessages] = useState([])

  const [sortMsg,setSortMsg] = useState([])

  useEffect(() => {
      setBase(Math.floor(Math.random() * 5000))
  },[])

  useEffect(() => {
    axios.get('/messages/sync')
   .then(res => {
     setMessages(res.data)})
 }, [])

  useEffect(() => {
    /*YOUR PUSHER CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
  },[messages])
  
  useEffect(() => {
    
    if(id) {
          const lastMessage = async() => {
            const sortMsg1 = messages.filter(message => {return message.roomId === id}).reverse()
            setSortMsg(sortMsg1)
            //console.log(sortMsg)
            //console.log(messages)
    }

    lastMessage()

  }},[id,messages])


  

  const createChatHandler = async(e) => {
      e.preventDefault();
      const roomName = prompt("please enter room name")

      if (roomName) {
       const res = await axios.get('/rooms');
       const resData = res.data
       const resReal = resData.filter(room => {return room.name === roomName})
       if (resReal.length) {
        alert('Chat room name is alreayd in use. Please type in a different name!')
        //resReal = [];
       } else {
        await axios.post('/rooms', {
          name: roomName
        })
       }
       //resReal = [];
      }

}



  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebar-chat'>
      <Avatar src= {`https://avatars.dicebear.com/api/human/${base}.svg`}/>
      <div className='sidebar-chat-info'>
        <h2>{name}</h2>
        <p>{sortMsg.length ? sortMsg[0].message : ''}</p>
      </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChatHandler} className='sidebar-chat'>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
