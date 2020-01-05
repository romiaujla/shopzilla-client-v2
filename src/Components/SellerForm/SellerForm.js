import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./SellerForm.css";
import { formatDate } from "../../HelperFunctions/HelperFunctions";
import ShopListContext from '../../Contexts/ShopListContext';

//only renders Seller Edit Form in the ShopPage component when logged in as Seller

class SellerForm extends Component {
  
  state = {
    shop: {},
  };

  static defautProps = {
    shop: {},
    closeEditForm: () => {},
    editShop: () => {},
  }

  static contextType = ShopListContext;

  componentDidMount = () => {
    let {start_date, end_date} = this.props.shop;
    start_date = formatDate(start_date);
    end_date = formatDate(end_date);
    this.setState({
      shop: {
        ...this.props.shop,
        start_date,
        end_date
      }
    })
  }

  handleEditingShop = (e) => {
    e.preventDefault();
    
    const {
      service_type,
      shop_name,
      description,
      address,
      start_date,
      end_date,
      opening_time,
      closing_time      
    } = e.target

    const newShopData = {
      service_type: service_type.value,
      shop_name: shop_name.value,
      description: description.value,
      address: address.value,
      start_date: start_date.value,
      end_date: end_date.value,
      opening_time: opening_time.value,
      closing_time: closing_time.value,      
    }

    // Updating all the shop in the list of all the shops
    this.context.setShopById(newShopData, this.state.shop.id);
    //update the state of the shop on the ShopPage.js 
    this.props.editShop(newShopData);
    // we close the edit form
    this.props.closeEditForm();

  }

  render() {

    const {shop} = this.state;

    return (
      <form className="SellerForm" onSubmit={(e) => {this.handleEditingShop(e)}}>
        <fieldset>
          <div className="flex">
            <label htmlFor="service_type">
              <span className="input-title">* Service Type:</span>
              <select
                name='service_type'
                id='service_type'
                onChange={e => {
                  this.setState({ 
                    shop: {
                      ...shop,
                      service_type: e.target.value
                    }
                   });
                }}
                value={shop.service_type}
              >
                <option value="food and drink">Food & Drink</option>
                <option value="body healing">Body Healing</option>
                <option value="toy and leisure">Toy & Leisure</option>
                <option value="bath and body">Bath & Body</option>
                <option value="clothing and accessories">
                  Clothing & Accessories
                </option>
                <option value="home and party decor">Home & Party Decor</option>
                <option value="education">Education</option>
                <option value="others">Others</option>
              </select>
            </label>
            <label htmlFor="shop_name">
              <span className="input-title">* Shop Name:</span>
              <input
                type="text"
                id="shop_name"
                name="shop_name"
                required
                defaultValue={shop.shop_name}
                onChange={e => {
                  this.setState({
                    shop: {
                      ...shop,
                      shop_name: e.target.value
                    }
                  });
                }}
              />
            </label>
            <label htmlFor="description">
              <span className="input-title">* Description:</span>
              <textarea
                type="textarea"
                id="desc"
                name="description"
                required
                value={shop.description}
                onChange={e => {
                  this.setState({
                    shop: {
                      ...shop,
                      description: e.target.value
                    }
                  });
                }}
              ></textarea>
            </label>
            <label htmlFor="address">
              <span className="input-title">* address:</span>
              <input
                type="text"
                id="address"
                name="address"
                required
                defaultValue={shop.address}
                onChange={e => {
                  this.setState({
                    shop: {
                      ...shop,
                      address: e.target.value
                    }
                  });
                }}
              />
            </label>
            <label htmlFor="start_date">
              <span className="input-title">* Opening Date:</span>
              <input
                name='start_date'
                id='start_date'
                type="text"
                defaultValue={shop.start_date}
                onChange={e => {
                  this.setState({
                    ...shop,
                    start_date: e.target.value
                  });
                }}
              />
            </label>
            <label htmlFor='end_date'>
              <span className="input-title">* Closing Date:</span>
              <input
                name='end_date'
                id='end_date'
                type="text"
                defaultValue={shop.end_date}
                onChange={e => {
                  this.setState({
                    ...shop,
                    end_date: e.target.value
                  });
                }}
              />
            </label>
            <label htmlFor="opening_time">
              <span>*Opening Time:</span>
              <input
                type="time"
                name='opening_time'
                id='opening_time'
                placeholder="Enter your opening time"
                defaultValue={shop.opening_time}
                onChange={e => {
                  this.setState({
                    ...shop,
                    opening_time: e.target.value
                  });
                }}
              />{" "}
            </label>
            <label htmlFor='closing_time'>
              <span>*Closing Time:</span>
              <input
                id='closing_time'
                name='closing_time'
                type="time"
                placeholder="Enter your closing time"
                defaultValue={shop.closing_time}
                onChange={e => {
                  this.setState({
                    ...shop,
                    closing_time: e.target.value
                  });
                }}
              />
            </label>
          </div>
          <div>
                <button
                  className='btn btn-primary'
                  type='submit'
                >
                  Save
                </button>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={() => {this.props.closeEditForm()}}
                >
                  Cancel
                </button>
            </div>
        </fieldset>
      </form>
    );
  }
}
export default SellerForm;
