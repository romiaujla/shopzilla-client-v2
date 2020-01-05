import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage(props){
    return (
        <span className='ErrorMessage'>{props.message}</span>
    )
}

