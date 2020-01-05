import React from 'react';

const LoggedContext = React.createContext({
    loggedInUser: {
        id: '',
        type: ''
    },
    setUserType: () => {},
    clearLoggedInUser: () => {},
})

export default LoggedContext;

export class LoggedProvider extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loggedInUser: {
                id: '',
                type: ''
            },
        }
    }

    setUserType = (type, id) => {
        this.setState({
            loggedInUser: {
                id,
                type
            }
        })
        localStorage.setItem("userId", id);
        localStorage.setItem("userType", type);
    }

    // could have been done by using the setUserType = (type, id) => {}, 
    // but made this to improve the readability of code
    // once used in loggout button click.
    clearLoggedInUser = () => {
        this.setState({
            loggedInUser: {
                id: '',
                type: ''
            }
        })
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
    }

    componentDidMount = () => {        
        if(localStorage.getItem("userId")){
            if(this.state.loggedInUser.id !== localStorage.getItem("userId")){
                this.setState({
                    loggedInUser: {
                        id: localStorage.getItem("userId"),
                        type: localStorage.getItem("userType"),
                    }
                })
            }
        }
    }

    render(){

        const val = {
            loggedInUser: this.state.loggedInUser,
            setUserType: this.setUserType,
            clearLoggedInUser: this.clearLoggedInUser,
        }

        return (
            <LoggedContext.Provider value={val}>
                {this.props.children}
            </LoggedContext.Provider>
        );
    }
}