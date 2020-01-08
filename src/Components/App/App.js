import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from '../Navbar/Navbar'
import Landing from '../Landing/Landing';
import SignUpPage from '../../Routes/SignUpPage/SignUpPage';
import LoginPage from '../../Routes/LoginPage/LoginPage';
import ExplorePage from '../../Routes/ExplorePage/ExplorePage';
import ShopPage from '../../Routes/ShopPage/ShopPage';
import ShopListContext from '../../Contexts/ShopListContext';
import ShopService from '../../Service/ShopService';
import FavouritePage from '../../Routes/FavouritePage/FavouritePage';
import ProductService from '../../Service/ProductService';

export default class App extends Component {

  static contextType = ShopListContext;

  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false,
      products: [],
      shops: [],
    }
  }

  componentDidMount = () => {
    // get all the shops and set to context
    ShopService.getShops()
      .then((shops) => {
        this.setState({
          shops,
        })
        this.context.setShops(shops);
      })
      .catch(err => {
        this.context.setError(err)
      })

    ProductService.getProducts()
      .then((products) => {
        this.setState({
          products,
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
        })
      })
  }

  render() { 
    return (
      <div className='App'>
      <Route path='/' component={Navbar} />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path={`/signup`} component={SignUpPage} />
        <Route exact path={`/login`} component={LoginPage} />
        <Route exact path='/explore' component={ExplorePage} />
        <Route 
          exact 
          path={`/shop/:id`} 
          component={ (rprops) => {
            const {id} = rprops.match.params;
            const shop = this.context.getShopById(id)[0];
            const products = this.state.products.filter(product => product.shop_id === parseInt(id, 10))
            let showShopButtons = false;
            if (localStorage.getItem('userId') === id
                && localStorage.getItem('userType') === 'shop'){
                  showShopButtons = true
              }
            return <ShopPage 
              rprops={rprops} 
              shop={shop}
              products={products}
              showShopButtons={showShopButtons}
            />
          }} 
        />

        <Route path={`/favourite`} component={FavouritePage}/>
      </Switch>
    </div>
    );
  }
}

