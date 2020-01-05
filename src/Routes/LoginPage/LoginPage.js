import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import Backdrop from '../../Components/Backdrop/Backdrop';
import './LoginPage.css';

class LoginPage extends Component {

    onLoginSuccess = () => {
        this.props.history.push(`/explore`);
        
    }

    render() { 
        return ( 
            <div className='LoginPage'>
                <Backdrop>
                    <LoginForm onLoginSuccess={() => {
                        this.onLoginSuccess();
                    }} />
                </Backdrop>
            </div>
        );
    }
}
 
export default LoginPage;