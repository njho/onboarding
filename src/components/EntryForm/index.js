import React from 'react';
import ProductEntryParent from './ProductEntry/ProductEntryParent'
import ProductList from './ProductEntry/ProductList'
import PlacesAutocomplete from 'react-places-autocomplete';
import {connect} from 'react-redux'
import DeleteButton from './delete';
import SignIn from './SignIn';
import LocationEntry from './LocationEntry/index';


import StripeWrapper from './../Stripe/StripeWrapper';


const mapStateToProps = (state) => {
    return {
        companyName: state.business.companyName,
        products: state.business.products,
        visibleDemo: state.demo.visibleDemo
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: () => {
        dispatch({type: 'BUSINESS_DEMO_FOCUS', visibleDemo: -1})
    },
    changeHandler: (event, field) => {
        dispatch({type: 'FORM_HANDLER', field: field, targetValue: event.target.value})
    },
    addProduct: (e) => {
        e.preventDefault();
        dispatch({type: 'ADD_PRODUCT'});
    }

})

class EntryForm extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [{name: ''}],
            address: 'Metropolis, Kansas'
        };
        this.onChange = (address) => this.setState({address})
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
    };

    handleFormSubmit = (event) => {
        event.preventDefault()

    };

    render() {

        const input = {
            paddingRight: '20px !important'
        }

        /* Options for the Address Autocomplete */

        const options = {
            types: ['(cities)'],
            componentRestrictions: {country: ["us", "ca"]}
        }
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        }

        const focusHandler = () => {
            console.log('work already')
            this.props.onFocus();
        }


        return (

            <div className="inner">
                <h3 className="inline">Enroll your business with Gifty</h3>
                <form className="signup_form" method="post" action="">
                    <div className="card">
                        <div className="card_content">
                            <div className="card_section">
                                <div className="grid">
                                    <div className="cell">
                                        <div className="field">
                                            <label htmlFor="first_name">Your Name </label>
                                            <input placeholder="Lois Lane" type="text" name="personal[first_name]"
                                                   id="first_name" onFocus={()=>focusHandler()}/>
                                        </div>

                                    </div>
                                    <div className="cell">
                                        <div className="field">
                                            <label htmlFor="email">Email Address</label>
                                            <input placeholder="lois@dailyplanet.com" type="email"
                                                   name="personal[email]" id="email" onFocus={()=>focusHandler()}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid">
                                    <div className="cell">
                                        <div className="field">
                                            <label htmlFor="location">Business Name</label>
                                            <input type="text" name="business[location]" id="location"
                                                   placeholder="The Daily Planet"
                                                   onChange={(e) => this.props.changeHandler(e, 'companyName')}
                                                   onFocus={()=>focusHandler()}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid">
                                    <div className="cell">
                                        <div className="field">
                                            <label htmlFor="instagram">Instagram Handle</label>
                                            <div className="hidden_input_wrapper">
                                                <div className="hidden_input_addition">@</div>
                                                <input type="text" name="business[instagram]" id="instagram"
                                                       placeholder="gifty.link" onFocus={()=>focusHandler()}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cell">
                                        <div className="field">
                                            <label htmlFor="business_type">Business Type</label>
                                            <input type="text" name="business[business_type]" id="business_type"
                                                   placeholder="Upscale Bakery" onFocus={()=>focusHandler()}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid">
                                    <div className="cell">
                                        <div className="field">
                                            &nbsp;
                                            <h4 className="inline">Business Locations</h4>
                                            <LocationEntry></LocationEntry>

                                        </div>
                                    </div>
                                </div>
                                &nbsp;


                                <h4 className="inline">Product Information</h4>

                                <ProductList></ProductList>

                                <ProductEntryParent></ProductEntryParent>
                                &nbsp;

                                <h4 className="inline">Please provide your credit card information</h4>
                                <StripeWrapper/>
                                &nbsp;

                                <SignIn></SignIn>
                                &nbsp;

                                <ul className="actions">
                                    <li>
                                        <input className="button special" type="submit" value="Enroll!"/>
                                        <input type="hidden" name="action" value="Enroll!"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
/*                                            <PlacesAutocomplete inputProps={inputProps} options={options}
 onFocus={()=>focusHandler()}/>*/
export default connect(mapStateToProps, mapDispatchToProps)(EntryForm)


/*{this.props.products.map((products, idx) => (
 <div key={idx}>

 <Products index={idx}></Products>
 &nbsp;
 &nbsp;
 </div>

 ))}*/