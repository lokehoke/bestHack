'use strict';

import { setUser, setPath, setAllAlgo } from '../actions/actions.js';

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
            console.log(this._store.getState());
            setTimeout( () => {
                console.log(this._store)
                if (this._store.getState().userInfo.role == 1) {
                    this._store.dispatch(setPath('/admin'));
                }
            }, 100);
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

    getAllAlgo(onGood = () => {}, onError = () => {}) {
        fetch('/allData', this._getAllAlgoRec()).then(res => {
            res.json().then(algos => {
                console.log(1);
                console.log(algos);
                this._dispatchAllAlgo(algos);
                onGood(algos);
            });
        });
    }

    algoCodeFetch(json, onGood = (res) => { console.log(res.json()); }, onError = (err) => { console.log(err.json()); }) {
        fetch('/algoCode', ServerFetch._postFetch(json)).then(res => {
            console.log(1);
            onGood(res);
        }).catch(err => {
            onError(err);
        });
    }

    static _postFetch(json) {
        return {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };
    }

    _getAllAlgoRec() {
        return {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };
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

    _dispatchAllAlgo(algos) {
        this._store.dispatch(setAllAlgo(algos));
    }
}