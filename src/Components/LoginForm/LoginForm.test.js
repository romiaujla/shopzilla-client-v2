import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';


it('renders without crashing', () => {
    const div = document.createElement('div');

    //render the component, this is the actual test, if something is wrong it will fail here
    ReactDOM.render(
        <LoginForm />
        , div);

    //clean up code
    ReactDOM.unmountComponentAtNode(div);
});
