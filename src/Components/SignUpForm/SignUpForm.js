import React, { Component } from 'react';
import './SignUpForm.css';
import RegistrationService from '../../Service/RegistrationService';
import AddShopProfileFields from '../AddShopProfileFields/AddShopProfileFields';
import {renderErrorTag} from '../../HelperFunctions/HelperFunctions';
import ShopListContext from '../../Contexts/ShopListContext';

export default class SignUpForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  static contextType = ShopListContext;

  // hey there adding a comment to check renaming of the file

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rePassword: '',
      user_type: -1,
      error: true,
      isEnabled: true,
      usernameErrorTags: {
        length: true,
        alreadyExists: true
      },
      passwordErrorTag: {
        length: true
      },
      rePasswordErrorTag: {
        match: true
      },
      userTypeErrorTag: {
        noSelection: true
      },
      nameErrorTag: {
        length: true
      }
    };
  }

  handleRegisteration = e => {
    e.preventDefault();
    let user = {
      username: e.target.username.value,
      password: e.target.password.value,
      user_type: e.target.user_type.value
    };

    if (user.user_type === 'buyer'){
      user = {
        ...user,
        name: e.target.name.value,
      }
    } else {
      user = {
        ...user,
        shop_name: e.target.shop_name.value,
        address: e.target.address.value,
        description: e.target.description.value,
        service_type: e.target.service_type.value,
        start_date: e.target.start_date.value,
        end_date: e.target.end_date.value,
        opening_time: e.target.opening_time.value,
        closing_time: e.target.closing_time.value,
        image_url: 'shop.png',
      }
    }
    this.addUser(user);
  };

  addUser = credentials => {
    
    return RegistrationService.registerBuyer(credentials)
      .then(registeredUser => {
        // if shop add shop to the context
        if(credentials.user_type === 'shop'){
          let newShop = {
            ...registeredUser,
            id: registeredUser.shop_id,
          }
          // removing unwanted fields
          const fieldsToRemove = ['username', 'password', 'shop_id', 'user_type', 'avatar_url']
          fieldsToRemove.forEach(field => {
            delete newShop[field];
          })
          
          this.context.setShops([...this.context.shops, newShop]);      
        }

        this.props.onRegistrationSuccess(credentials.username, credentials.password);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUserNameChange = username => {
    
    // to make sure username get stored in lowercase in the db
    username = username.toLowerCase();

    // username.trim() - So the user is not able to add
    // spaces to the begining and the end of the username
    this.setState({
      username: username.trim().toLowerCase()
    });

    // check the length of the username
    if (username.length >= 6 && username.length <= 72) {
      this.setState({
        usernameErrorTags: {
          ...this.state.usernameErrorTags,
          length: false
        }
      });

      RegistrationService.checkUserExistance(username).then(user => {
        if (user && user.length) {
          this.setState({
            usernameErrorTags: {
              ...this.state.usernameErrorTags,
              alreadyExists: true
            }
          });
        } else {
          this.setState({
            usernameErrorTags: {
              ...this.state.usernameErrorTags,
              alreadyExists: false
            }
          });
        }
      });
    } else {
      this.setState({
        usernameErrorTags: {
          ...this.state.usernameErrorTags,
          length: true,
          alreadyExists: true
        }
      });
    }

    this.buttonStateChange();
  };

  handlePasswordChange = password => {
    this.setState({
      password
    });

    if (password.length >= 6 && password.length <= 72) {
      this.setState({
        passwordErrorTag: {
          ...this.state.passwordErrorTag,
          length: false
        }
      });
    } else {
      this.setState({
        passwordErrorTag: {
          ...this.state.passwordErrorTag,
          length: true
        }
      });
    }

    this.buttonStateChange();
  };

  handleUserTypeChange = user_type => {
    this.setState({
      user_type
    });

    if (user_type === -1) {
      this.setState({
        userTypeErrorTag: {
          ...this.state.userTypeErrorTag,
          noSelection: true
        }
      });
    } else {
      this.setState({
        userTypeErrorTag: {
          ...this.state.userTypeErrorTag,
          noSelection: false
        }
      });
    }
    this.buttonStateChange();
  };

  handleReEnteringPasswordChange = rePassword => {
    this.setState({
      rePassword
    });

    if (rePassword === this.state.password) {
      this.setState({
        rePasswordErrorTag: {
          ...this.state.rePasswordErrorTag,
          match: false
        }
      });
    } else {
      this.setState({
        rePasswordErrorTag: {
          ...this.state.rePasswordErrorTag,
          match: true
        }
      });
    }
    this.buttonStateChange();
  };

  handeNameChange = name => {
    this.setState({
      name
    });

    if (name.trim().length > 0) {
      this.setState({
        nameErrorTag: {
          ...this.state.nameErrorTag,
          length: false
        }
      });
    } else {
      this.setState({
        nameErrorTag: {
          ...this.state.nameErrorTag,
          length: true
        }
      });
    }
    this.buttonStateChange();
  };

  buttonStateChange = () => {
    const {
      usernameErrorTags,
      passwordErrorTag,
      rePasswordErrorTag,
      userTypeErrorTag,
      nameErrorTag
    } = this.state;

    let errors = [
      usernameErrorTags.length,
      usernameErrorTags.alreadyExists,
      passwordErrorTag.length,
      rePasswordErrorTag.match,
      userTypeErrorTag.noSelection
    ];

    if (this.state.user_type === 'buyer') {
      errors = [...errors, nameErrorTag.length];
    }

    if (errors.includes(true)) {
      this.setState({
        isEnabled: false
      });
    } else {
      this.setState({
        isEnabled: true
      });
    }
  };

  render() {
    const {
      usernameErrorTags,
      passwordErrorTag,
      rePasswordErrorTag,
      userTypeErrorTag,
      nameErrorTag
    } = this.state;

    return (
      <form
        className='SignUpForm'
        onSubmit={e => {
          this.handleRegisteration(e);
        }}
      >
        <fieldset>
          <legend>Register</legend>
          <div className='flex'>
            <label htmlFor='username'>
              <span className='label-tag'>*Username</span>
              <input
                type='text'
                name='username'
                id='username'
                required
                value={this.state.username}
                onChange={e => {
                  this.handleUserNameChange(e.target.value);
                }}
              />
              {renderErrorTag(
                usernameErrorTags.length,
                'Username must be between 6 and 72 characters in length'
              )}
              {renderErrorTag(
                usernameErrorTags.alreadyExists,
                'Username already taken'
              )}
            </label>
            <label htmlFor='password'>
              <span className='label-tag'>*Password</span>
              <input
                type='password'
                name='password'
                id='password'
                required
                value={this.state.password}
                onChange={e => {
                  this.handlePasswordChange(e.target.value);
                }}
              />
              {renderErrorTag(
                passwordErrorTag.length,
                'Password must be between 6 and 72 character in length'
              )}
            </label>
            <label htmlFor='rePassword'>
              <span className='label-tag'>*Re-enter Password</span>
              <input
                type='password'
                name='rePassword'
                id='rePassword'
                required
                value={this.state.rePassword}
                onChange={e => {
                  this.handleReEnteringPasswordChange(e.target.value);
                }}
              />
              {renderErrorTag(
                rePasswordErrorTag.match,
                'Passwords do not match'
              )}
            </label>
            <label htmlFor='user_type'>
              <span className='label-tag'>*Account Type</span>
              <select
                name='user_type'
                className='select-css'
                id='user_type'
                required
                value={this.state.user_type}
                onChange={e => {
                  this.handleUserTypeChange(e.target.value);
                }}
              >
                <option value='-1'>Select an account type</option>
                <option value='shop'>Seller</option>
                <option value='buyer'>Buyer</option>
              </select>
              {renderErrorTag(
                userTypeErrorTag.noSelection,
                'Select one account type to continue'
              )}
            </label>
            {this.state.user_type === 'shop' && <AddShopProfileFields />}
            {this.state.user_type === 'buyer' && (
              <>
                <label htmlFor='name'>
                  <span className='label-tag'>Name</span>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    defaultValue={this.state.name}
                    onChange={e => {
                      this.handeNameChange(e.target.value);
                    }}
                  />
                  {renderErrorTag(nameErrorTag.length, 'Name is required')}
                </label>
                <button
                  type='submit'
                  className='btn primary-btn'
                  disabled={!this.state.isEnabled}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </fieldset>
      </form>
    );
  }
}
