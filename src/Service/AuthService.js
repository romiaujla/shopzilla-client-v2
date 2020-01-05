import config from '../config';

const AuthApiService = {
    // login authorization
    postLogin(credentials){
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => {
                    throw new Error(e.error.message)
                })
            }
            
            return res.json();
        })
        .then(res => res)
        .catch(error => error)
    },

    // creating a user
    postUser(user){
        return fetch(`${config.API_ENDPOINT}/user`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => {
                    throw new Error(e.error.message)
                })
            }

            return res.json();
        })
        .then(res => res)
        .catch(err => err);
    },

    // create the shop
    postShop(shop){
        return fetch(`${config.API_ENDPOINT}/shop`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(shop)
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => {
                    throw new Error(e.error.message)
                })
            }

            return res.json();
        })
        .then(res => res)
        .catch(err => err);
    },
}

export default AuthApiService;
