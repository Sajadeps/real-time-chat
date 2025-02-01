const initialState = {
    username: '',
    room: '',
    showChat: false,
    currentMessage: '',
    messageList: [],
  };
  
  export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_ROOM':
        return { ...state, room: action.payload };
      case 'SET_SHOW_CHAT':
        return { ...state, showChat: action.payload };
      case 'SET_CURRENT_MESSAGE':
        return { ...state, currentMessage: action.payload };
      case 'ADD_MESSAGE':
        return { ...state, messageList: [...state.messageList, action.payload] };
      default:
        return state;
    }
  };
  