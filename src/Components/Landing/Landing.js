import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
import Backdrop from "../Backdrop/Backdrop";
import config from '../../config';

export default class Landing extends Component {
  render() {
    return (
      <div className='Landing'>
        <Backdrop>
          <img
            src={require("../../images/logo-white.png")}
            alt="Shopping Cart"
            className="hero-logo"
          ></img>
          <h1 className="x-large-land">
            Shop<mark className="hero-mark">zilla</mark>
          </h1>
          <p className="lead">
            You have a product? We'll help you grow your brand and your business
          </p>
          <div className="buttons">
            <Link to={`${config.BASEPATH}/signup`} className="btn btn-primary">
              Sign Up
            </Link>
            <Link to={`${config.BASEPATH}/login`} className="btn btn-light">
              Login
            </Link>
          </div>
        </Backdrop>
      </div>
    );
  }
}
