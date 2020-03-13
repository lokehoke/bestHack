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
				userInfo: action.userInfo,
				isLogin: true,
			});

			
		case 'TOGGLE_USER_WITHBLE':
			{
				let users = state.users.map((el) => {

					if (el.id === action.id) {
						el.isClose = !el.isClose;	
					} 
					
					return el;
				});
			
				return Object.assign({}, state, {
					users,
				});
			}	
			

		case 'TOGGLE_ALG_WITHBLE':
			{
				let users = state.users.map((el) => {
					let flag = false;
					el.algs = el.algs.map((el, id) => {
						if (el.id === action.id) {
							el.isAlgSelected = true;
							state.isAlgSelected = true;
							flag = true;							
						} else {
							el.isAlgSelected = false;
						} 						
						return el;
					});

					el.isUserSelected = flag;
					if (el.isUserSelected) {
						state.selectUser = el.name;
					}

					return el;
				});
			
				return Object.assign({}, state, {
					users,
				});
			}
			
		case 'OPEN_BLOCKER': 
			return Object.assign({}, state, {
				blokerIsActive: true
			});
		
		case 'CLOSE_BLOCKER': 
			return Object.assign({}, state, {
				blokerIsActive: false
			});
		
		case 'OPEN_MY_ALG': 
		{
			let myAlgs = state.myAlgs.map((el) => {
				el.isAlgSelected = (el.id === action.id);	
				return el;
			});
	
			return Object.assign({}, state, {
				myAlgs,
				isAlgSelected: true,
			});
		}
		
		case 'SET_ALL_ALGO':
			console.log(action.algos);
			return Object.assign({}, state, {
				users: action.algos.map((el) => {
					return {
						isClose: true,
						id: el.id,
						name: el.email,
						isUserSelected: false,
						algs: el.codes.map((alg) => {
							alg.isAlgSelected = false;
							return alg;
						}),
					}
				}),
			});

		default:
			return state;
	}


};
				

export default getReducer;