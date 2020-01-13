import config from '../config';

const ProductService = {
    getProducts(){
        return fetch(`${config.API_ENDPOINT}/products/shop`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        })
            .then((res) => res.json())
            .then(res => res)
            .catch(err => {console.log(err)});
    }
}

export default ProductService;