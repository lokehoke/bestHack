'use strict';
const getReducer = (settings) => (state = settings, action) => {
  
	switch(action.type) {
    	case 'SET_PATH':
      		return Object.assign({}, state, {
        		currentPath: action.newPath,
			});
		case 'SET_USER':
			return Object.assign({}, state, {
				userInfo: action.user,
				isLogin: true,
			});
    default:
      return state;
  }


};
        

export default getReducer;