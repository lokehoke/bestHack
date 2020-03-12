'use strict';

const defStore = {
    dispatch: () => {},
};

class ServerFetch {
    constructor(store = defStore) {
        this._store = store;
    }

    registerFetch(user, onGood = () => {}, onError = () => {}) {
        fetch('/register', ServerFetch._getUserFetch(user)).then(res => {
            onGood(res);
        }).catch(err => {
            onError(err);
        });
    }

    authFetch(user, onGood = () => {}, onError = () => {}) {
        fetch('/auth', ServerFetch._getUserFetch(user)).then(res => {
            onGood(res);
        }).catch(err => {
            onError(err);
        });
    }

    static _getUserFetch(user) {
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
}