import React from 'react';
import ReactDOM from 'react-dom';
import ExplorePage from './ExplorePage';
import { BrowserRouter } from 'react-router-dom';

describe(`ExplorePage Component`, () => {
    it(`renders without crashing`, () => {
        const div = document.createElement('div');

        ReactDOM.render(
            <BrowserRouter>
                <ExplorePage />
            </BrowserRouter>
        , div)
        ReactDOM.unmountComponentAtNode(div);
    })
})