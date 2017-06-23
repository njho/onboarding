import React from 'react';
import { connect } from 'react-redux';
import Validation from 'react-validation';
import validator from 'validator';


const mapStateToProps = (state,ownProps) => {
    return {
        product: state.business.products[ownProps.index],
        visibleDemo: state.demo.visibleDemo,
        index: ownProps.index,
        products: state.business.products
    }
};

const mapDispatchToProps = dispatch => ({
    onFocus: (index) => {
        dispatch({type: 'PRODUCT_DEMO_FOCUS', visibleDemo: index})
    },
    changeHandler: (newProducts) => {
        dispatch({type: 'PRODUCT_HANDLER', newProducts: newProducts})
    }

})

class SignIn extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }


    render() {
        const focusHandler = (index) =>{
        }

        const changeHandler = (event, index, field) => {
            let newProducts = this.props.products.slice();
            newProducts[index][field]= event.target.value;
            this.props.changeHandler(newProducts);
        }



        return (

            <div className="grid">

                <div className="cell" onFocus={()=>focusHandler(this.props.index)}>
                    <div className="field">
                        <label htmlFor="email">Email Address</label>
                        <input placeholder="lois@dailyplanet.com" type="email"
                               name="personal[email]" id="email" onFocus={()=>focusHandler()}/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input placeholder="••••••••" type="password"
                               name="personal[password]" id="password" onFocus={()=>focusHandler()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(()=>{},mapDispatchToProps)(SignIn);