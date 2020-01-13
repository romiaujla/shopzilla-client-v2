import React, { Component } from 'react'
import ShopContext from '../../Contexts/ShopContext'
import './FavouritePage.css'
import { arrayIsEmpty } from '../../HelperFunctions/HelperFunctions';
import FavouriteService from '../../Service/FavouriteService';

class FavoritePage extends Component {
    
    state = {
        savedProducts: []
    }

    static contextType = ShopContext;

    componentDidMount() {
        FavouriteService.getFavourite(localStorage.getItem('userId'))
            .then((savedProducts) => {
                this.setState({
                    savedProducts,
                })
            })
            .catch(err => {
                this.setState({hasError: err})
            })
    }

    handleRemoveProduct = (id) => {
        const savedProducts = this.state.savedProducts.filter(prod => prod.id !== id);
        this.setState({
            savedProducts,
        })
        FavouriteService.deleteFavourite(localStorage.getItem('userId'), id);
    }

    renderProduct() {
        return this.state.savedProducts.map(product => {
            return (
                <article key={product.id} >
                    <img
                        src={require(`../../../public/images/products/${product.image_url}`)}
                        alt='product'
                    />
                    <div className='text'>
                        <h3>{product.item}</h3>
                        <p>Description: {product.description}</p>
                        <p>Price: $ {product.price}</p>
                        <button
                            onClick={() => this.handleRemoveProduct(product.id)}
                            className='btn-delete'>
                            Remove
                        </button>
                    </div>
                </article>
            );
        });
}
render() {
    return (
        <div className='FavouritePage'>
            <h1>Your Saved Items</h1>
            <section className='grid'>
            {
                arrayIsEmpty(this.state.savedProducts) ? <div>Loading...</div> : this.renderProduct()
            }
               
            </section>

        </div>

    )
}
}

export default FavoritePage;