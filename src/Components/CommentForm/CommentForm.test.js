import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './CommentForm';


it('renders without crashing', () => {
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
        <CommentForm />
        , div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});
