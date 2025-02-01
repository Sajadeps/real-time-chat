import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMessage, addMessage } from "../redux/action";

export const Chat = ({ socket, username, room }) => {
  const dispatch = useDispatch();
  const { currentMessage, messageList } = useSelector((state) => state.chat);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time:
          (new Date(Date.now()).getHours() % 12) +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      dispatch(addMessage(messageData)); // Add message to the Redux store
      dispatch(setCurrentMessage("")); // Clear current message
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      dispatch(addMessage(data)); // Add received message to the Redux store
    };
    socket.on("receive_message", handleReceiveMsg);

    return () => {
      socket.off("receive_message", handleReceiveMsg);
    };
  }, [socket, dispatch]);

  const containRef = useRef(null);

  useEffect(() => {
    containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [messageList]);

  return (
    <>
      <div className="chat_container">
        <h1>Welcome {username}</h1>
        <div className="chat_box">
          <div
            className="auto-scrolling-div"
            ref={containRef}
            style={{
              height: "450px",
              overflowY: "auto",
              border: "2px solid yellow",
            }}
          >
            {messageList.map((data) => (
              <div
                key={data.id}
                className="message_content"
                id={username === data.author ? "you" : "other"}
              >
                <div>
                  <div className="msg" id={username === data.author ? "y" : "b"}>
                    <p>{data.message}</p>
                  </div>
                  <div className="msg_detail" style={{ marginTop: "10px" }}>
                    <p>{data.author}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat_body">
            <input
              value={currentMessage}
              type="text"
              placeholder="Type Your Message"
              onChange={(e) => dispatch(setCurrentMessage(e.target.value))}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </>
  );
};
