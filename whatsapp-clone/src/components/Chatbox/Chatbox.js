import React, {useState, useEffect} from 'react'
import './Chatbox.css'
import { Avatar, FormControlLabel } from '@material-ui/core'
import {IconButton} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios'
import {useParams} from 'react-router-dom'
import {useStateValue} from '../../StateProvider'
import Pusher from 'pusher-js';


const Chatbox = () => {

  const [{user},dispatch] = useStateValue();

  const [base,setBase] = useState('')

  const [input,setInput] = useState('')

  const [roomName,setRoomName] = useState('')

  const [messages, setMessages] = useState([])

  const {Id} = useParams()
  
  useEffect(() => {
    setBase(Math.floor(Math.random() * 5000))
  },[Id])


useEffect(()=> {
  if (Id) {
  const roomFinder = async() => {
  const rooms = await axios.get('/rooms')
  const roomData = rooms.data
  const roomItem = roomData.filter(room => {return room._id === Id})
  setRoomName(roomItem[0].name)
//-------------------------------------------------------------------------------
 
  const msg = await axios.get('/messages/sync')
  const msgData = msg.data
  const msgItem = msgData.filter(msg => {return msg.roomId === Id})
  setMessages(msgItem)
  //console.log(msgItem)
  }

roomFinder()

  }
},[Id])



useEffect(() => {
  /*YOUR PUSHER CODE WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
},[messages])




  const sendMessageHandler = async(e) => {
    e.preventDefault();

    //const currentDateTime = new Date()

    await axios.post('/messages/new', {
      message: input,
      name: user.displayName,
      timestamp: new Date().toLocaleString() + "  " + new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2],//Intl.DateTimeFormat().resolvedOptions().timeZone,//firebase.firestore.FieldValue.serverTimestamp(),
      roomId: Id,
      received: false
    });

    setInput('')
  }
  //console.log(roomName)


  return (
    <div className='chatbox'>
    <div className='chatbox-header'>
      <Avatar src= {`https://avatars.dicebear.com/api/human/${base}.svg`} />
      <div className='chatbox-header-info'>
        <h3>{roomName}</h3>
        <p>{'Last Seen: ' + messages[messages.length -1]?.timestamp === 'undefined' ? '' : 'Last Seen:  ' + messages[messages.length -1]?.timestamp}</p>
      </div>
      <div className='chatbox-header-right'>
      <IconButton>
        <SearchOutlined />
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
      </div>
      </div>

      <div className='chatbox-body'>
        {messages.map((message) => 
        (
          <p className={`chatbox-message ${message.name === user.displayName && 'chatbox-receiver'}`}>
        <span className='chatbox-name'>{message.name}</span>
          {message.message}
          <span className='chatbox-timestamp'>{message.timestamp}</span>
          </p>
        ))}
          </div>
          <div className='chatbox-footer'>
          <InsertEmoticonIcon />
          <form>
            <input value={input} onChange={event => setInput(event.target.value)} placeholder='Type a message' type='text' />
            <button onClick={sendMessageHandler} type='submit'>Send a message</button>
          </form>
          <MicIcon />
          </div>
    </div>
  )
}

export default Chatbox
