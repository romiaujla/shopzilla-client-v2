import React from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import TestData from '../../HelperFunctions/TestData';

it('renders without crashing', () => {
    const div = document.createElement('div');
    
    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
        <Product product={TestData.products[0]} />
        , div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});
