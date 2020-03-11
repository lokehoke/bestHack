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