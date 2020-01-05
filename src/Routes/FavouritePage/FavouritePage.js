import React, { Component } from 'react'
import ShopContext from '../../Contexts/ShopContext'
import './FavouritePage.css'
import { arrayIsEmpty } from '../../HelperFunctions/HelperFunctions';

class FavoritePage extends Component {
    state = {
        savedProducts: []
    }
    static contextType = ShopContext;

    componentDidMount() {
        this.setState(previousState => ({
            savedProducts: [...previousState.savedProducts, this.context.savedProducts]
        }));
    }

    handleRemoveProduct = (id) => {
        const updatedProducts = this.state.savedProducts.filter(product => product.id !== id)
        this.setState({
            savedProducts: [...updatedProducts]
          });
        alert('Removed');
    }

    renderProduct() {
        return this.context.savedProducts.map(product => {
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
{/*                         
                            <button
                                onClick={() => this.handleRemoveProduct(product.id)}
                                className='btn-delete'>
                            
                                Remove
                            </button> */}
                        
                    </div>
                </article>
            );
        });
}
render() {
    return (
        <div >
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