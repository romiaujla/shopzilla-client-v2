import React, { Component } from 'react'
import './CommentForm.css'
import ShopService from '../../Service/ShopService'
import ShopContext from '../../Contexts/ShopContext'

export default class CommentForm extends Component {
  static contextType = ShopContext

  handleSubmitComment = ev => {
    ev.preventDefault()
    
    const { review, rating } = ev.target
    // const { shop } = this.context
    const { shop } = this.props
    const  buyerId  = this.context.loggedInUser.id

    const newReview = {
      shop_id: shop.id,
      buyer_id: buyerId,
      review: review.value,
      rating: rating.value
    }
    
    ShopService.postComment(newReview)
      .then(this.context.addComment)
      .then(() => {
        review.value = ''
        rating.value = 0
      })
      .catch(this.context.setError)
  }

  render() {
    return (
      <form
        className='CommentForm'
        onSubmit={this.handleSubmitComment}
      >
      <h2>Leave a review for our shop</h2>
        <div className='review'>
          <textarea
            required
            aria-label='Type a comment...'
            name='review'
            id='review'
            cols='30'
            rows='3'
            placeholder='Type a comment..'>
          </textarea>
        </div>

        <div className='select'>
          <label htmlFor='rating'>Rate this shop!</label>
          <select
            required
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
