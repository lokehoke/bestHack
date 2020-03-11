'use strict';
const getReducer = (settings) => (state = settings, action) => {
  
  switch(action.type) {
    case 'SET_PATH':
      return Object.assign({}, state, {
        currentPath: action.newPath,
      });
    default:
      return state;
  }


};
        

export default getReducer;