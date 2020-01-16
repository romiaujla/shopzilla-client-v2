import React from 'react';
import ReactDOM from 'react-dom';
import FavouritePage from './FavouritePage';
import { BrowserRouter } from 'react-router-dom';

describe(`FavouritePage Component`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <FavouritePage />
            </BrowserRouter>
        , div)
        ReactDOM.unmountComponentAtNode(div);
    })
})