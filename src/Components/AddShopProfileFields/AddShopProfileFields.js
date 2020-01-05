import React, { Component } from 'react';
import './AddShopProfileFields.css';
import {renderErrorTag, formatDate} from '../../HelperFunctions/HelperFunctions';

class AddShopProfileFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shop_name: '',
            shopNameErrorTag: {
                length: true,
            },
            address: '',
            addressErrorTag: {
                length: true,
            },
            service_type: '-1',
            serviceTypeErrorTag: {
                noSelection: true,
            }
        }
    }

    handleChangeShopName = (shop_name) => {
        this.setState({
            shop_name,
        })

        if(shop_name.trim()){
            this.setState({
                shopNameErrorTag: {
                    ...this.state.shopNameErrorTag,
                    length: false
                }
            })
        }else {
            this.setState({
                shopNameErrorTag: {
                    ...this.state.shopNameErrorTag,
                    length: true
                }
            })
        }
    }

    handleChangeAddress = (address) => {
        this.setState({
            address,
        })

        if(address.trim()){
            this.setState({
                addressErrorTag: {
                    ...this.state.addressErrorTag,
                    length: false
                }
            })
        }else {
            this.setState({
                addressErrorTag: {
                    ...this.state.addressErrorTag,
                    length: true
                }
            })
        }
    }

    handleServiceTypeChange = (service_type) => {
        this.setState({
            service_type,
        })

        if(service_type !== -1){
            this.setState({
                serviceTypeErrorTag: {
                    ...this.state.serviceTypeErrorTag,
                    noSelection: false
                }
            })
        }else{
            this.setState({
                serviceTypeErrorTag: {
                    ...this.state.serviceTypeErrorTag,
                    noSelection: true
                }
            })
        }
    }

    render() { 

        const {
            shopNameErrorTag,
            addressErrorTag
        } = this.state;

        return (
            <>
                <label htmlFor='shop_name'>
                    <span className='label-tag'>
                        *Shop Name
                    </span>
                    <input
                        type='text'
                        name='shop_name'
                        id='shop_name'
                        required
                        value={this.state.shop_name}
                        onChange={(e) => {this.handleChangeShopName(e.target.value)}}
                    />
                    {renderErrorTag(shopNameErrorTag.length, 'Shop Name is required')}
                </label>
                <label htmlFor='address'>
                    <span className='label-tag'>    
                        *Address
                    </span>
                    <input
                        type='text'
                        name='address'
                        id='address'
                        required
                        value={this.state.address}
                        onChange={(e) => {this.handleChangeAddress(e.target.value)}}
                    />
                    {renderErrorTag(addressErrorTag.length, 'Address is required')}
                </label>
                <label htmlFor='description'>
                    <span className='label-tag'>    
                        Description
                    </span>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                    />
                </label>
                <label htmlFor='description'>
                    <span className='label-tag'>    
                        *Service Type
                    </span>
                    <select
                        className='select-css'
                        value={this.state.service_type}
                        onChange={(e) => {this.handleServiceTypeChange(e.target.value)}}
                        name='service_type'
                        id='service_type'
                    >
                        <option value='-1'>Select a service type...</option>
                        <option value="food and drinks">Food & Drink</option>
                        <option value="body healing">Body Healing</option>
                        <option value="toy and leisure">Toy & Leisure</option>
                        <option value="bath and body">Bath & Body</option>
                        <option value="clothing and accessories">Clothing & Accessories</option>
                        <option value='sports and hobbies'>Sports and hobbies</option>
                        <option value="home and party decor">Home & Party Decor</option>
                        <option value="educational">Education</option>
                        <option value='tattoo and piercing'>Tattoo and piercing</option>
                    </select>
                </label>
                <label htmlFor='start_date'>
                    <span className='label-tag'>    
                        *Start Date
                    </span>
                    <input
                        type='text'
                        name='start_date'
                        id='start_date'
                        defaultValue={formatDate(new Date())}
                    />
                    {/* do date validation */}
                </label>
                <label htmlFor='end_date'>
                    <span className='label-tag'>    
                        *End Date
                    </span>
                    <input
                        type='text'
                        name='end_date'
                        id='end_date'
                        defaultValue={formatDate(new Date())}
                    />
                    {/* do date validation */}
                </label>
                <label htmlFor='opening_time'>
                    <span className='label-tag'>    
                        *Opening Time
                    </span>
                    <input
                        type='time'
                        name='opening_time'
                        id='opening_time'
                        defaultValue='10:00:00'
                    />
                    {/* do time validation */}
                </label>
                <label htmlFor='closing_time'>
                    <span className='label-tag'>    
                        *Closing Time
                    </span>
                    <input
                        type='time'
                        name='closing_time'
                        id='closing_time'
                        placeholder='22:00:00'
                        defaultValue='22:00:00'
                    />
                    {/* do time validation */}
                </label>
                <button 
                    className='btn btn-primary'
                    type='submit' 
                >
                    Register
                </button>
            </>
        );
    }
}
 
export default AddShopProfileFields;