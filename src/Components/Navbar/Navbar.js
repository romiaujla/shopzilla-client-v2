import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import TokenService from '../../Service/TokenService';
import LoggedContext from '../../Contexts/LoggedContext';

export default class Navbar extends Component {

  static contextType = LoggedContext;

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.context.clearLoggedInUser();
    this.props.history.push(`/`);
  }


  render() {
    return (
      <nav className='navbar bg-dark'>
        <h1 className='nav-logo-text'>
          {
            TokenService.hasAuthToken()
            ?
            <Link to={`/explore`}>Shopzilla</Link>
            :
            <Link to={`/`}>Shopzilla</Link>
          }
        </h1>
        <ul>
          <li>
            <Link to={`/explore`}>Explore</Link>
          </li>
          { !TokenService.hasAuthToken() &&
            <li>
              <Link to={`/signup`}>Register</Link>
            </li>
          }
          <li>
            {
              TokenService.hasAuthToken()
              ?
              <div>
              <button
                  className='link-btn'
                  onClick={()=>{this.handleLogout()}}>
                  Logout
              </button>
              {
                localStorage.getItem('userType') === 'shop' &&
                  <Link to={`/shop/${localStorage.getItem('userId')}`}>
                    Your Shop
                  </Link>
              }
              {
                localStorage.getItem('userType') === 'buyer' &&
                  <Link to={`/favourite`}>
                    Saved Items
                  </Link>
              }
              </div>
                
              : 
                <Link to={`/login`}>Login</Link>   
            }
          </li>
        </ul>
      </nav>
    );
  }
}
