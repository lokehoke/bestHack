'use strict';

export const setPath = newPath => ({
    type: 'SET_PATH',
    newPath,
});

export const setUser = user => ({
    type: 'SET_USER',
    user,
});