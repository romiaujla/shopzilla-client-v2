import React from 'react';
import ReactDOM from 'react-dom';
import ShopPage from './ShopPage';
import { BrowserRouter } from 'react-router-dom';
import TestData from '../../HelperFunctions/TestData';

describe(`ShopPage Component`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div');
        const rprops = {
            match: {
                params: {
                    id: TestData.shops[0].id
                }
            }
        }

        ReactDOM.render(
            <BrowserRouter>
                <ShopPage 
                    rprops={rprops} 
                    products={TestData.products} 
                    shop={TestData.shops[0]} 
                />
            </BrowserRouter>
        , div)
        ReactDOM.unmountComponentAtNode(div);
    })
})