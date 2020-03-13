'use strict';

import { setUser, setPath } from '../actions/actions.js';

const defStore = {
    dispatch: () => {},
};

export default class ServerFetch {
    constructor(store = defStore) {
        this._store = store;
    }

    registerFetch(user, onGood = () => {}, onError = () => {}) {
        fetch('/register', this._getUserFetch(user)).then(res => {
            onGood(res);
            console.log(this._store.getState().userInfo);
            if (this._store.getState().userInfo.role == 1) {
                this._store.dispatch(setPath('/admin'));
            }
        }).catch(err => {
            onError(err);
        });
    }

    authFetch(user, onGood = () => {}, onError = () => {}) {
        fetch('/auth', this._getUserFetch(user)).then(res => {
            onGood(res);
        }).catch(err => {
            onError(err);
        });
    }

    getUserInfoFetch(onGood = () => {}, onError = () => {}) {
        fetch('/status', this._getUserFetch({})).then(res => {
            res.json().then(user => {
                this._dispatchSetUser(user);
                onGood(user);
            });
        }).catch(err => {
            onError(err);
        });
    }

    _getUserFetch(user) {
        return {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                email: user.email || '',
                password: user.password || '',
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };
    }

    _dispatchSetUser(user) {
        this._store.dispatch(setUser(user));
    }
}