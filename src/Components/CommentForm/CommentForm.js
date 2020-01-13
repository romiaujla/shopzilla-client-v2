import React, { Component } from 'react'
import './CommentForm.css'
import ShopService from '../../Service/ShopService'
import ShopContext from '../../Contexts/ShopContext'

export default class CommentForm extends Component {
  static contextType = ShopContext

  handleSubmitComment = ev => {
    ev.preventDefault()
    
    const { review, rating } = ev.target
    const { shop } = this.props
    const  buyerId  = this.context.loggedInUser.id

    let newReview = {
      shop_id: shop.id,
      buyer_id: buyerId,
      review: review.value,
      rating: Number(rating.value)
    }
    ShopService.postComment(newReview)
      .then((newReview) => {
        ShopService.getCommentById(newReview.id)
        .then(addedReview => this.props.addComment(addedReview))
      })
      .then(() => {
        review.value = ''
        rating.value = 1
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <form
        className='CommentForm'
        onSubmit={this.handleSubmitComment}
        hidden={this.props.isDisabled}
      >
        <div className='review'>
          <textarea
            required
            aria-label='Type a comment...'
            name='review'
            id='review'
            cols='30'
            rows='3'
            placeholder='Leave a review for our shop here...'>
          </textarea>
        </div>

        <div className='select'>
          <label htmlFor='rating'>Rate this shop!</label>{'  '}
          <select
            aria-label='Rate this shop!'
            name='rating'
            id='rating'
          >
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </select>
        </div>

        <button type='submit'>
          Post Comment
        </button>
      </form>
    )
  }
}
