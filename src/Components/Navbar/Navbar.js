import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import TokenService from '../../Service/TokenService';
import LoggedContext from '../../Contexts/LoggedContext';
import config from '../../config';

export default class Navbar extends Component {

  static contextType = LoggedContext;

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.context.clearLoggedInUser();
    this.props.history.push(`${config.BASEPATH}`);
  }


  render() {
    return (
      <nav className='navbar bg-dark'>
        <h1 className='nav-logo-text'>
          {
            TokenService.hasAuthToken()
            ?
            <Link to={`${config.BASEPATH}/explore`}>Shopzilla</Link>
            :
            <Link to={`${config.BASEPATH}`}>Shopzilla</Link>
          }
        </h1>
        <ul>
          <li>
            <Link to={`${config.BASEPATH}/explore`}>Explore</Link>
          </li>
          { !TokenService.hasAuthToken() &&
            <li>
              <Link to={`${config.BASEPATH}/signup`}>Register</Link>
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
                  <Link to={`${config.BASEPATH}/shop/${localStorage.getItem('userId')}`}>
                    Your Shop
                  </Link>
              }
              {
                localStorage.getItem('userType') === 'buyer' &&
                  <Link to={`${config.BASEPATH}/favourite`}>
                    Saved Items
                  </Link>
              }
              </div>
                
              : 
                <Link to={`${config.BASEPATH}/login`}>Login</Link>   
            }
          </li>
        </ul>
      </nav>
    );
  }
}
