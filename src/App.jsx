import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setRoom, setShowChat } from './redux/action'
import io from 'socket.io-client'
import { Chat } from './components/Chat'
import "./App.css"
import "./index.css"

const socket = io.connect("https://real-time-chat-3-uqu7.onrender.com")

const App = () => {
  const dispatch = useDispatch()
  const { username, room, showChat } = useSelector((state) => state.chat)

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      dispatch(setShowChat(true))
    } else {
      alert("please fill the details to join room")
    }
  };

  return (
    <>
      {!showChat && (
        <div className="join_room">
          <h1>Join Chat</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
          <input
            type="text"
            placeholder="Enter Chat Room"
            value={room}
            onChange={(e) => dispatch(setRoom(e.target.value))}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      )}
      {showChat && (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App
