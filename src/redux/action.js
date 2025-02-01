export const setUsername = (username) => ({
    type: 'SET_USERNAME',
    payload: username
  });
  
  export const setRoom = (room) => ({
    type: 'SET_ROOM',
    payload: room
  });
  
  export const setShowChat = (show) => ({
    type: 'SET_SHOW_CHAT',
    payload: show
  });
  export const setCurrentMessage = (message) => ({
    type: 'SET_CURRENT_MESSAGE',
    payload: message
  });
  
  export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message
  });
  