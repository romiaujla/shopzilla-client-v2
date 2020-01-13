import config from '../config';

const FavouriteService = {
    
    getFavourite(buyer_id){
        return fetch(`${config.API_ENDPOINT}/favourites/${buyer_id}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => {console.log(err)});
    },

    insertFavourite(newFav){
        return fetch(`${config.API_ENDPOINT}/favourites`, {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(newFav)
        })
        .then((res) => res.json())
        .then(res => res)
        .catch(err => {console.log(err)});
    },

    deleteFavourite(buyer_id, product_id){
        return fetch(`${config.API_ENDPOINT}/favourites/${buyer_id}/${product_id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            },
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => {console.log(err)});
    }
}

export default FavouriteService;