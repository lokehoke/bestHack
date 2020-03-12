'use strict';

import { setUser } from '../actions/actions.js';

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
            this._dispatchSetUser(user);
        }).catch(err => {
            onError(err);
        });
    }

    authFetch(user, onGood = () => {}, onError = () => {}) {
        fetch('/auth', this._getUserFetch(user)).then(res => {
            onGood(res);
            this._dispatchSetUser(user);
        }).catch(err => {
            onError(err);
        });
    }

    _getUserFetch(user) {
        return {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };
    }

    _dispatchSetUser(user) {
        this._store.dispatch(setUser({
            email: user.email,
            password: user.password,
        }));
    }
}