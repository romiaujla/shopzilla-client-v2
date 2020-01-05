import React, { Component } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

//this is to display information in a Shop Card
export default class Cards extends Component {
  static defaultProps = {
    shop_id: 1,
    shop_name: 'Flip Flop USA',
    service_type: 'Clothing and accessories',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image_url: ''
  };

  // handleShopCardClick = () => {

  //    this.props.handleShopCardClick(this.props.shop_id);

  // };

  limitDescription = (description, length) => {
    if (description.length <= length) {
      return description;
    }
    return description.slice(0, length) + '...';
  };

  render() {
    return (
      <Link
        to={`/shop/${this.props.shopId}`}
        className='card-container'
        // onClick={() => {
        //   this.handleShopCardClick();
        // }}
      >
        {!this.props.image_url ? (
          <div
            className='shop-img'
            style={{
              backgroundImage: `url(https://source.unsplash.com/H2N9K9y9e3E)`
            }}
          ></div>
        ) : (
          <div
            className='shop-img'
            style={{
              backgroundImage: `url(/images/store-images/${this.props.image_url})`
            }}
          ></div>
        )}
        <div className='card-text'>
          <span className='store-type'>{this.props.service_type}</span>
          <h2>{this.props.shop_name}</h2>
          <p>{this.limitDescription(this.props.description, 100)}</p>
        </div>
      </Link>
    );
  }
}
