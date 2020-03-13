'use strict';

export const setPath = newPath => ({
    type: 'SET_PATH',
    newPath,
});

export const authSuccess = () => ({
    type: 'AUTH-SUCCESS'
}); 

export const authError = () => ({
    type: 'AUTH-ERROR'
});

export const registSuccess = () => ({
    type: 'REGIST-SUCCESS'
}); 

export const registError = () => ({
    type: 'REGIST-ERROR'
});

export const setUser = user => ({
    type: 'SET_USER',
    user,
});

export const ToggleUserWithble = id => ({
    type: 'TOGGLE_USER_WITHBLE',
    id,
});

export const ToggleAlgWithble = id => ({
    type: 'TOGGLE_ALG_WITHBLE',
    id,
});

export const openBlocker = () => ({
    type: 'OPEN_BLOCKER',
})

export const closeBlocker = () => ({
    type: 'CLOSE_BLOCKER',
})
 