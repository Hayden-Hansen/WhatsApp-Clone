import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar} from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import axios from '../../axios'
import { useStateValue } from '../../StateProvider';



const Sidebar = () => {

  const [rooms, setRooms] = useState([]);

  const [{user},dispatch] = useStateValue();

  const [searchRoom,setSearchRoom] = useState([]);
 
  useEffect(()=> {
    axios.get('/rooms').then(res => setRooms(res.data.map(({_id, name}) => ({
      id: _id,
      name: name
    }))));

  }, [rooms])


  const searchRoomHandler = async(text) => {
    if (text.target.value) {
      const room = rooms.filter(room => {return room.name.startsWith(text.target.value)})
      setSearchRoom(room)
    } else {
      setSearchRoom([])
    }
  }


  return (
    <div className='sidebar'>
        <div className='sidebar-header'>
                <Avatar src= {user?.photoURL} />
            <div className='sidebar-header-right'>
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                <ChatIcon />
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
                </div>
              </div>

                <div className='sidebar-search'>
                  <div className='sidebar-search-container'>
                  <SearchOutlined />
                  {<input placeholder='Search or start new chat' type='text' onChange={searchRoomHandler}/>}
                    </div>
                </div>
                <div className='sidebar-chats'>
                  {<SidebarChat addNewChat />}
                  {!searchRoom.length ? rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.name}/>
                  )) : searchRoom.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.name}/>
                  ))}
                </div>
            </div>
  )
}

export default Sidebar
