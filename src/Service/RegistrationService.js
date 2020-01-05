import config from '../config';

const RegistrationService = {
    checkUserExistance(username){
        return fetch(`${config.API_ENDPOINT}/register/${username}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => {console.log(err)});
    },

    // create the buyer
    registerBuyer(user){
        return fetch(`${config.API_ENDPOINT}/users`, {
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
}

export default RegistrationService;