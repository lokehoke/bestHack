'use strict';
const getReducer = (settings) => (state = settings, action) => {
	switch(action.type) {
		
		case 'SET_PATH':
			history.pushState(null,'', action.newPath);
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

		case 'SET_USER':
			return Object.assign({}, state, {
				userInfo: action.user,
				isLogin: true,
			});

			
		case 'TOGGLE_USER_WITHBLE':
				
				let users = state.users.map((el) => {

				if (el.id === action.id) {
					el.isClose = !el.isClose;
					console.log('el.isClose: ', el.isClose);
				}
				
				return el;
			});
			
			return Object.assign({}, state, {
				users,
			});
		


		default:
			return state;
	}


};
				

export default getReducer;