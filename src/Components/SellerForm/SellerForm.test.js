import React from 'react';
import ReactDOM from 'react-dom';
import SellerForm from './SellerForm';
import TestData from '../../HelperFunctions/TestData';

it('renders without crashing', () => {
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
        <SellerForm shop={TestData.shops[0]} />
        , div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});

