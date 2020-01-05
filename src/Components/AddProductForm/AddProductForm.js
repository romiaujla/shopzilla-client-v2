import React, { Component } from "react";
import "./AddProductForm.css";
import ShopContext from '../../Contexts/ShopContext';
import ShopService from "../../Service/ShopService";

//Seller can add new product 

class AddProductForm extends Component {

  state = {
    product: {},
  };

  static defautProps = {
    handleAddProduct: () => { },
    handleCloseAddProdForm: () => { },
  }

  static contextType = ShopContext;

  handleAddProduct = e => {
    e.preventDefault();

    const {
      img_url,
      product_name,
      description,
      price
    } = e.target

    let imageURL = img_url.value;
    if(!imageURL.trim()){
      imageURL = 'product.png'
    }

    const shopId  = this.context.loggedInUser.id

    ShopService.postNewProduct(shopId , imageURL, product_name.value, description.value, price.value)
      .then((product) => {
        this.props.handleAddProduct(product)
      })
      .then(() => {
        product_name.value = ''
        description.value = ''
        price.value = ''
        img_url.value = ''
        alert('Added successfully!')
      })
      .catch(err => console.log(err))

    //close edit form
    this.props.handleCloseEditProdForm()
  }

  render() {

    return (
      <form className="ProductForm" onSubmit={this.handleAddProduct}>
        <fieldset>
          <div className="flex">
            <label htmlFor='img_url'>
              <span className="input-title"> Product Image:</span>
              <input
                type='text'
                name='img_url'
                id='img_url'
              />
            </label>
            <label htmlFor="product_name">
              <span className="input-title">* Product Name:</span>
              <input
                type='text'
                name='product_name'
                id='product_name'
              />

            </label>
            <label htmlFor="description">
              <span className="input-title">* Description:</span>
              <input
                type="text"
                id="description"
                name="description"
                required
              />
            </label>
            <label htmlFor="price">
              <span className="input-title">* Price (in US dollars):</span>
              <input
                type="text"
                id="price"
                name="price"
                required
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
              onClick={() => { this.props.handleCloseEditProdForm() }}
            >
              Cancel
                </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
export default AddProductForm;
