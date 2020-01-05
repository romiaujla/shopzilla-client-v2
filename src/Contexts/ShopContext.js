import React, { Component } from 'react';
import LoggedContext from './LoggedContext';

//this context is to provide the information of a single shop

const ShopContext = React.createContext({
    shop: {},
    shopProducts: [],
    savedProducts: [],
    comments: [],
    error: null,
    setShop: () => {},
    setShopProducts: () => {},
    addProduct: () => {},
    saveProduct: () => {},
    setComments: () => {},
    addComment: () => {},
    setError: () => {},
    clearError: () => {},
    
})

export default ShopContext;

export class ShopProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: {},
            savedProducts: [],
            error: null,
        }
    }

    static contextType = LoggedContext;

    // set the shop in the state
    setShop = (shop) => {
        this.setState({
            shop
        })
    }

    //set products for a shop
    setShopProducts = (shopProducts) => {
        this.setState({
            shopProducts
        })
    }

    //add new product to shop
    addProduct = (product) => {
        
        this.setShopProducts(
            [...this.state.shopProducts, product]
        )
    }

    saveProduct = (product) => { //save customer's favorite product
        this.setState({
            savedProducts: this.state.savedProducts.concat(product)
        })
    }
    //add comment to the product
    addComment = comment => {
        this.setComments([
          ...this.state.comments,
          comment
        ])
      }

    setComments = comments => {
        this.setState({ comments })
      }

    setError = (error) =>{
        this.setState({
            error
        })
    }

    clearError = () =>{
        this.setState({error: null})
    }


    render() { 

        const value = {
            shop: this.state.shop,
            shopProducts: this.state.shopProducts,
            savedProducts: this.state.savedProducts,
            error: this.state.error,
            setShop: this.setShop,
            setShopProducts: this.setShopProducts,
            addProduct: this.addProduct,
            saveProduct: this.saveProduct,
            setComments: this.setComments,
            addComment: this.addComment,
            setError: this.setError,
            clearError: this.clearError
        }
        return (
            <ShopContext.Provider value={{...value, ...this.context}}>
                {this.props.children}
            </ShopContext.Provider>
        );
    }
}
