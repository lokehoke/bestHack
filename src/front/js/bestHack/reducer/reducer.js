'use strict';
const getReducer = (settings) => (state = settings, action) => {
  
  switch(action.type) {
    
    case 'SET_PATH':
      return Object.assign({}, state, {
        currentPath: action.newPath,
      });

    case 'AUTH_SUCCESS':
      return Object.assign({}, state, {
        authError: false,
      });

    case 'AUTH_ERROR':
      return Object.assign({}, state, {
        authError: true,
      });

      case 'REGIST_SUCCESS':
      return Object.assign({}, state, {
        registError: false,
      });

      case 'REGIST_ERROR':
      return Object.assign({}, state, {
        registError: true,
      });


    default:
      return state;
  }


};
        

export default getReducer;