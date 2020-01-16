import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
        , div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});
