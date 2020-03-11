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

export const setUser = user => ({
    type: 'SET_USER',
    user,
});