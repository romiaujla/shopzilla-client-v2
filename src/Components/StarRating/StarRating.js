import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export function StarRating({rating}) {
  const stars = [
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
    { filled: false },
  ]

  for (let i = 0; i < rating; i++) {
    stars[i].filled = true
  }

  return <span className='StarRating'>
    { stars.map((star, index) => <Star key={index} filled={star.filled} />) }
  </span>
}

function Star({filled}) {
  return <FontAwesomeIcon 
  icon={faStar} 
  style={filled ?{  color: '#e16b22' }: null}/>
}
