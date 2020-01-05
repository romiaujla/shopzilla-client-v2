import React, { Component } from 'react';
import ShopContext from './ShopContext';

const ShopListContext = React.createContext({
    shops: [],
    error: null,
    setShops: () => {},
    getShops: () => {},
    getShopById: () => {},
    getShopsByCategory: () => {},
    setShopById: () => {},
})

export default ShopListContext;

export class ShopListProvider extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            error: null,
        }
    }

    static contextType = ShopContext;

    // set the shops in the state
    setShops = (shops) => {
        this.setState({
            shops,
        })
    }

    setError = (error) =>{
        this.setState({
            error,
        })
    }

    clearError = () =>{
        this.setState({error: null})
    }

    getShopById = (id) => {
        return this.state.shops.filter(shop => shop.id === parseInt(id, 10));
    }

    setShopById = (newShopData, id) => {
        // change the shop with the provided id
        const updatedShops = this.state.shops.map(shop => {
            if(shop.id === id){
                shop = {
                    ...shop,
                    service_type: newShopData.service_type,
                    description: newShopData.description,
                    shop_name: newShopData.shop_name,
                    address:newShopData.address,
                    start_date: newShopData.start_date,
                    end_date: newShopData.end_date,
                    opening_time: newShopData.opening_time,
                    closing_time: newShopData.closing_time,
                }
                console.log(this.context.shop);
                this.context.setShop(shop);
                console.log(this.context.shop);
            }
            return shop;
        })

        this.setState({
            shops: updatedShops
        })
        // update context state with the new shopdata
        // and post request to the database to change the shop in the back end
    }

    getShops = () => {
        return this.state.shops;
    }

    getShopsByCategory = (service_type) => {
        return this.state.shops.filter(shop => shop.service_type === service_type);
    } 

    render() { 

        const obj = {
            shops: this.state.shops,
            error: this.state.error,
            setShops: this.setShops,
            getShops: this.getShops,
            getShopById: this.getShopById,
            getShopsByCategory: this.getShopsByCategory,
            setShopById: this.setShopById,
        }

        return (
            <ShopListContext.Provider value={{...obj, ...this.context}}>
                {this.props.children}
            </ShopListContext.Provider>
        );
    }
}
