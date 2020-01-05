import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

// takes user back to the previous page in history
export function handleGoBack(history) {
    return history.goBack();
}

// takes user to the specified route
export function routeUserTo(history, route) {
    return history.push(route);
}

// Returns true if the object is empty
export function objectIsEmpty(obj) {
    return (Object.entries(obj).length === 0 && obj.constructor === Object);
}

// Return true is value passed in not undefined
export function isNotUndefined(value){
    return value !== undefined;
}

// Returns true if array is empty
export function arrayIsEmpty(arr) {
    return (arr.length === 0);
}

// formats currency to $9,999,999.99
export function formatCurrency(amount) {
    amount = parseFloat(amount).toFixed(2);
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Returns date in a formatted manner MM/DD/YYYY
export function formatDate(dbDate) {
    const date = new Date(dbDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${month + 1}/${day}/${year}`;
};

export function renderErrorTag(error, tag){
    const redColor = {
      color: 'red',
      fontSize: '0.8em'
    };
    const greenColor = {
      color: 'green',
      fontSize: '0.8em'
    };

    return error ? (
      <span className='errorTag' style={redColor}>
        <FontAwesomeIcon icon={faTimes} /> {tag}
      </span>
    ) : (
      <span className='errorTag' style={greenColor}>
        <FontAwesomeIcon icon={faCheck} /> {tag}
      </span>
    );
  };