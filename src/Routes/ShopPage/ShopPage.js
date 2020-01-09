import React, { Component } from 'react';
import './ShopPage.css';
import ShopContext from '../../Contexts/ShopContext';
import ShopService from '../../Service/ShopService';
import moment from 'moment';
import SellerForm from '../../Components/SellerForm/SellerForm';
import AddProductForm from '../../Components/AddProductForm/AddProductForm';
import Product from '../../Components/Product/Product'
import CommentForm from '../../Components/CommentForm/CommentForm'
import FavouriteService from '../../Service/FavouriteService';
import { StarRating } from '../../Components/StarRating/StarRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//Shop Page route is when the buyer/customer clicks to visit the shop to see shop info and the products it offer

export default class ShopPage extends Component {
  static contextType = ShopContext;

  static defaultProps = {
    shop: {},
    products: [],
    rprops: {},
    showShopButtons: false,
    showBuyerButtons: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      rprops: {},
      shop: props.shop || {},
      comments: [],
      products: props.products || [],
      savedProducts: [],
      product: {},
      editingMode: false,
      editingProductMode: false,
      showSaveButton: false,
      hideCommentForm: true,
    };
  }

  renderInitialPageState = () => {
    if(localStorage.getItem('userType') === 'buyer'){
      this.setState({
        showSaveButton: true,
        hideCommentForm: false
      })
    }
  };

  getCommentsForShop = async () => {
    const { id } = this.props.rprops.match.params;
    await ShopService.getComments(id)
    .then(comments => {
      this.setState({
        comments
      })
    })
  }

  addComment = (comment) => {
    this.setState({
      comments: [
          ...this.state.comments,
          comment
        ]
    })
  }

  handleDeleteComment = comment_id => {
    const updatedComments = this.state.comments.filter(comment => comment.id !== comment_id)
    this.setState({
      comments: [...updatedComments]
    });
    ShopService.deleteComment(comment_id);
  }

  componentDidMount() {
    this.renderInitialPageState();
    this.getCommentsForShop()
  };


  handleCloseEditForm = () => {
    // Change the state to close the edit form
    this.setState({
      editingMode: false
    });
  };

  handleCloseAddProdForm = () => {
    this.setState({
      editingProductMode: false
    });
  };

  handleEditShop = shop => {
    // change state of the current shop
    this.setState({
      shop: {
        ...this.state.shop,
        ...shop
      }
    });

    // change data in the database
    ShopService.updateShop(shop, this.props.rprops.match.params.id)
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
  };

  toggleAddproduct = () => {
    this.setState({
      editingProductMode: !this.state.editingProductMode
    });
  };

  handleAddProduct = product => {
    this.setState({
      products: [...this.state.products, product]
    });
  };

  handleDeleteProduct = product_id => {
    const updatedProducts = this.state.products.filter(
      product => product.id !== product_id
    );
    this.setState({
      products: [...updatedProducts]
    });
    ShopService.deleteProduct(product_id, this.state.shop.id);
  };

  handleSaveProduct = (product) => {
    const { savedProducts } = this.context
    //qualify if the product hasn't existed using product id
    const result = savedProducts.find(prod => prod.id === product.id) 
    if (savedProducts.indexOf(result) === -1) {
      const newFav = {
        buyer_id: localStorage.getItem('userId'),
        product_id: product.id,
      }
      FavouriteService.insertFavourite(newFav)
        .then(newProduct => {
          this.context.addFavouriteProduct(newProduct);
        })
        .catch(err => {this.setState({hasError: true})})
      alert('Product saved successfully!')
    }
    else {
      alert('Product already saved!')
    }

  }

  renderShopInfo(shop) {
    return (
      <section className='side-profile'>
        <div className='shop-img'>
          {shop.image_url && (
            <img
              src={require(`../../../public/images/store-images/${shop.image_url}`)}
              alt='shop'
            />
          )}
        </div>
        {this.state.editingMode ? (
          <SellerForm
            shop={shop}
            closeEditForm={() => {
              this.handleCloseEditForm();
            }}
            editShop={shop => {
              this.handleEditShop(shop);
            }}
          />
        ) : (
            <div className='shop-info'>
              <h1 className='shop-name'>{shop.shop_name}</h1>
              <h4 className='description'>{shop.description}</h4>
              <div className='shop-info'>
                <h4>Come visit us at :</h4>
                <span>{shop.address}</span>
              </div>
              <div className='shop-info'>
                <h4>Opening at: </h4>
                <span>{shop.opening_time}</span>
              </div>
              <div className='shop-info'>
                <h4>Closing at: </h4>
                <span>{shop.closing_time}</span>
              </div>
              <h4>
                From
              <span className='not-bold'>
                  {' '}
                  {moment(shop.start_date).format('MM/DD/YYYY')}{' '}
                </span>
                to{' '}
                <span className='not-bold'>
                  {moment(shop.end_date).format('MM/DD/YYYY')}
                </span>
              </h4>
            </div>
          )}
        {this.props.showShopButtons && !this.state.editingMode && (
          <div>
            <button
              className='btn btn-primary'
              type='button'
              onClick={() => {
                this.setState({
                  editingMode: !this.state.editingMode
                });
              }}
            >
              Edit
            </button>
          </div>
        )}
        <div className='Comment_Section'>
          <ShopComments
            comments={this.state.comments}
            handleDeleteComment={this.handleDeleteComment} />
          <CommentForm
            shop={this.state.shop}
            addComment={this.addComment}
            isDisabled={this.state.hideCommentForm}
          />
        </div>
      </section>
    );
  }

  

  renderProducts(products) {
    return products.map(product => 
      <Product 
        product={product}
        key={product.id}
        showSaveButton={this.state.showSaveButton}
        handleSaveProduct={this.handleSaveProduct}
        showDeleteButton={this.props.showShopButtons}
        handleDeleteProduct={this.handleDeleteProduct}
      />)
  }

  renderProductsIfFound = products => {
    if (!products.length) {
      return (
        <div className='no-item'>
          <h1 className='no-item-header'>
            No products at the moment,
            <br />
            please come back later!
          </h1>
        </div>
      );
    }

    return (
      <>
        <h2>Our Items</h2>
        <div className='container'>
          <main className='grid'>{this.renderProducts(products)}</main>
        </div>
      </>
    );
  };

  render() {
    const { products = [] } = this.props;
    const { shop = {} } = this.props;
    return (
      <div className='seller-page ShopPage'>
        {this.renderShopInfo(shop)}
        <section className='items'>
          {this.props.showShopButtons && (
            <button
              className='btn btn-primary'
              type='button'
              onClick={this.toggleAddproduct}
            >
              Add Product
            </button>
          )}
          {this.state.editingProductMode && (
            <AddProductForm
              handleAddProduct={prod => {
                this.handleAddProduct(prod);
              }}
              handleCloseEditProdForm={this.handleCloseAddProdForm}
            />
          )}

          {!products ? (
            <div className='LoadingScreen'>Loading Products</div>
          ) : (
              this.renderProductsIfFound(products)
            )}
        </section>
      </div>
    );
  }
}

function ShopComments({ comments = [], handleDeleteComment }) {

  if(!comments.length){
    return (
      <div className='no-reviews'>
        No reviews at the moment
      </div>
    )
  }

  return (
    <ul className='review-list'>
      <li className='comment-header'>Reviews</li>
      {comments.map(comment =>
        <li key={comment.id} className='comment'>
          <p className='review-text'>
            "{comment.review}"
            <span
              className='delete-review'
              onClick={() => handleDeleteComment(comment.id)}>
              <FontAwesomeIcon icon={faTrash} size='sm' style={{ color: 'red' }} />
            </span>
          </p>

          <p className='review-user'>
            <StarRating rating={comment.rating} />
            {"  "}
            - {comment.name}
          </p>
        </li>
      )}
    </ul>
  )
}
