const initialState = {
    items: [],
  };
  
  const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CONTACTS':
        return {
          ...state,
          items: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default contactsReducer;
  